const BASE_URL = "http://localhost:5000/api";

const ADMIN_EMAIL = "admin@upnext.com";
const ADMIN_PASSWORD = "AdminUpNext2026!";

const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: [],
};

function assert(condition, message) {
  stats.total++;
  if (condition) {
    stats.passed++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    stats.failed++;
    stats.failures.push(message);
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

async function runSyncTests() {
  console.log("=================================================");
  console.log("👑 ADMIN CREDENTIALS & DB SYNCHRONIZATION TEST 👑");
  console.log("=================================================\n");

  let adminToken = "";
  let syncedEventId = "";

  // 1. ADMIN AUTHENTICATION TEST
  console.log("▶ TEST 1: Admin Authentication & Password Verification");
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    const loginData = await loginRes.json();
    assert(loginRes.status === 200, "Admin login returned HTTP 200 OK");
    assert(loginData.success === true, "Login response success is true");
    assert(loginData.data.role === "admin", "Authenticated user role is verified as 'admin'");
    assert(!!loginData.data.token, "Issued JWT token is valid");

    adminToken = loginData.data.token;
  } catch (err) {
    assert(false, `Admin auth error: ${err.message}`);
  }

  // 2. ADMIN PROFILE SYNCHRONIZATION
  console.log("\n▶ TEST 2: Admin Profile DB Sync (/api/auth/me)");
  try {
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const meData = await meRes.json();
    assert(meRes.status === 200, "Admin profile sync returned HTTP 200 OK");
    assert(meData.data.email === ADMIN_EMAIL, "Synced email matches admin@upnext.com");
    assert(meData.data.role === "admin", "Synced role matches 'admin'");
  } catch (err) {
    assert(false, `Admin profile sync error: ${err.message}`);
  }

  // 3. LIVE MUTATION & READ SYNCHRONIZATION TEST
  console.log("\n▶ TEST 3: Real-Time Mutation & Retrieval Synchronization");
  try {
    // 3a. Admin Creates Event
    const createRes = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: "Admin Sync Test Event 2026",
        description: "Testing real-time database synchronization with MongoDB Atlas.",
        category: "Tech",
        venue: "Accra Digital Centre",
        city: "Accra",
        latitude: 5.56,
        longitude: -0.2,
        date: "2026-12-01",
        time: "10:00 AM",
        price: 0,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
      }),
    });

    const createData = await createRes.json();
    assert(createRes.status === 201, "Admin event creation returned HTTP 201 Created");
    assert(!!createData.data._id, "Event persisted with MongoDB ObjectId");
    syncedEventId = createData.data._id;

    // 3b. Verify Immediate Sync on Read
    const getRes = await fetch(`${BASE_URL}/events/${syncedEventId}`);
    const getData = await getRes.json();
    assert(getRes.status === 200, "Immediate read sync returned HTTP 200 OK");
    assert(getData.data.title === "Admin Sync Test Event 2026", "Retrieved event title matches newly persisted document");

    // 3c. Admin Updates Event
    const updateRes = await fetch(`${BASE_URL}/events/${syncedEventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: "Admin Sync Test Event 2026 (Updated & Verified)",
        price: 50,
      }),
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, "Admin event update returned HTTP 200 OK");
    assert(updateData.data.price === 50, "Update operation instantly synced in database");

    // 3d. Admin Deletes Event (Cleanup)
    const deleteRes = await fetch(`${BASE_URL}/events/${syncedEventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(deleteRes.status === 200, "Admin event deletion returned HTTP 200 OK");

    // 3e. Verify Deletion Sync
    const verifyDelRes = await fetch(`${BASE_URL}/events/${syncedEventId}`);
    assert(verifyDelRes.status === 404, "Deleted event confirmed removed from MongoDB Atlas (HTTP 404)");
  } catch (err) {
    assert(false, `Synchronization test error: ${err.message}`);
  }

  // SUMMARY REPORT
  console.log("\n=================================================");
  console.log("📊 SYNCHRONIZATION TEST REPORT SUMMARY");
  console.log("=================================================");
  console.log(`Total Assertions Executed : ${stats.total}`);
  console.log(`Passed Assertions         : ${stats.passed} ✅`);
  console.log(`Failed Assertions         : ${stats.failed} ❌`);

  if (stats.failed === 0) {
    console.log("\n🎉 ALL ADMIN CREDENTIALS & DB SYNCHRONIZATION TESTS PASSED!");
  } else {
    process.exit(1);
  }
}

runSyncTests();
