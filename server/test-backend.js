const BASE_URL = "http://localhost:5000/api";

let authToken = "";
let createdEventId = "";
let testUserEmail = `test_${Date.now()}@upnext.org`;
let testPassword = "Password123!";

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

async function runTests() {
  console.log("=================================================");
  console.log("🧪 RIGOROUS BACKEND & MONGODB ATLAS TEST SUITE 🧪");
  console.log("=================================================\n");

  // 1. HEALTH CHECK
  console.log("▶ TEST SUITE 1: System & Database Health Check");
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    assert(res.status === 200, "Health check returns 200 OK");
    assert(data.status === "online", "Server status is 'online'");
    assert(data.database === "MongoDB", "Database provider is MongoDB");
  } catch (err) {
    assert(false, `Health check request failed: ${err.message}`);
  }

  // 2. AUTHENTICATION & SECURITY
  console.log("\n▶ TEST SUITE 2: Authentication & JWT Authorization");
  try {
    // 2a. Register User
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Developer",
        email: testUserEmail,
        password: testPassword,
        role: "organizer",
      }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201, "User registration returns 201 Created");
    assert(regData.success === true, "User registration body success is true");
    assert(!!regData.data.token, "Registration returns valid JWT token");
    authToken = regData.data.token;

    // 2b. Prevent Duplicate Registration
    const dupRes = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Duplicate User",
        email: testUserEmail,
        password: testPassword,
      }),
    });
    assert(dupRes.status === 400, "Duplicate email registration rejected with 400");

    // 2c. Login User
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testUserEmail,
        password: testPassword,
      }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200, "User login returns 200 OK");
    assert(loginData.data.email === testUserEmail, "Login returns matched user email");

    // 2d. Reject Wrong Password
    const wrongPassRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testUserEmail,
        password: "WrongPassword999!",
      }),
    });
    assert(wrongPassRes.status === 401, "Invalid password login rejected with 401");

    // 2e. Protected Profile Route
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, "Protected /auth/me returns 200 OK with valid JWT");
    assert(meData.data.email === testUserEmail, "Profile data matches authenticated user");

    // 2f. Reject Unauthenticated Access
    const unauthRes = await fetch(`${BASE_URL}/auth/me`);
    assert(unauthRes.status === 401, "Unauthenticated /auth/me access rejected with 401");
  } catch (err) {
    assert(false, `Authentication suite error: ${err.message}`);
  }

  // 3. EVENT CRUD & GEOSPATIAL SEARCH
  console.log("\n▶ TEST SUITE 3: Events CRUD & MongoDB 2dsphere Spatial Radius Search");
  try {
    // 3a. Fetch All Events
    const getRes = await fetch(`${BASE_URL}/events`);
    const getData = await getRes.json();
    assert(getRes.status === 200, "Get events returns 200 OK");
    assert(Array.isArray(getData.data), "Events payload is array");
    assert(getData.count >= 4, "MongoDB Atlas contains seeded events (count >= 4)");

    // 3b. Keyword Search Filter
    const searchRes = await fetch(`${BASE_URL}/events?search=Summit`);
    const searchData = await searchRes.json();
    assert(searchRes.status === 200, "Keyword search returns 200 OK");
    assert(searchData.data.some(e => e.title.includes("Summit")), "Search results match keyword 'Summit'");

    // 3c. Category Filter
    const catRes = await fetch(`${BASE_URL}/events?category=Music`);
    const catData = await catRes.json();
    assert(catRes.status === 200, "Category filter returns 200 OK");
    assert(catData.data.every(e => e.category.toLowerCase() === "music"), "All returned events match 'Music' category");

    // 3d. Create New Event in MongoDB Atlas
    const createRes = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: "Rigorous Test Gala 2026",
        description: "Automated test event created during rigorous backend verification.",
        category: "Tech",
        venue: "Ridge Towers",
        city: "Accra",
        latitude: 5.558,
        longitude: -0.19,
        date: "2026-11-28",
        time: "06:00 PM",
        price: 25,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
      }),
    });
    const createData = await createRes.json();
    assert(createRes.status === 201, "Create event returns 201 Created");
    assert(!!createData.data._id, "Created event has MongoDB ObjectId");
    createdEventId = createData.data._id;

    // 3e. MongoDB 2dsphere Spatial Radius Query ($near)
    const geoRes = await fetch(`${BASE_URL}/events/nearby?lat=5.558&lng=-0.19&radiusKm=5`);
    const geoData = await geoRes.json();
    assert(geoRes.status === 200, "MongoDB 2dsphere /events/nearby query returns 200 OK");
    assert(geoData.count > 0, "Spatial search returns events within 5km radius");
    assert(geoData.data.some(e => e._id === createdEventId), "Created event included in spatial radius search");

    // 3f. Fetch Single Event by ID
    const singleRes = await fetch(`${BASE_URL}/events/${createdEventId}`);
    const singleData = await singleRes.json();
    assert(singleRes.status === 200, "Fetch single event returns 200 OK");
    assert(singleData.data.title === "Rigorous Test Gala 2026", "Fetched event title matches created title");

    // 3g. Bookmark Event
    const markRes = await fetch(`${BASE_URL}/events/${createdEventId}/bookmark`, {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const markData = await markRes.json();
    assert(markRes.status === 200, "Toggle bookmark returns 200 OK");
    assert(markData.isBookmarked === true, "Event is marked as bookmarked for user");

    // 3h. Update Event
    const updateRes = await fetch(`${BASE_URL}/events/${createdEventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ price: 30, title: "Rigorous Test Gala 2026 (Updated)" }),
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, "Update event returns 200 OK");
    assert(updateData.data.price === 30, "Updated event price reflected as 30");
  } catch (err) {
    assert(false, `Events suite error: ${err.message}`);
  }

  // 4. TICKETS & BOOKING SYSTEM
  console.log("\n▶ TEST SUITE 4: Ticket Purchases & QR Code Generation");
  try {
    // 4a. Purchase Ticket
    const tktRes = await fetch(`${BASE_URL}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        eventId: createdEventId,
        quantity: 2,
      }),
    });
    const tktData = await tktRes.json();
    assert(tktRes.status === 201, "Purchase ticket returns 201 Created");
    assert(tktData.data.quantity === 2, "Ticket quantity is 2");
    assert(tktData.data.totalPrice === 60, "Total price computed correctly (30 * 2 = 60)");
    assert(tktData.data.ticketId.startsWith("TKT-"), "Ticket ID formatted with 'TKT-' prefix");
    assert(!!tktData.data.qrCode, "Ticket contains valid QR code string");

    // 4b. Fetch User Tickets
    const myTktRes = await fetch(`${BASE_URL}/tickets/my`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const myTktData = await myTktRes.json();
    assert(myTktRes.status === 200, "Get user tickets returns 200 OK");
    assert(myTktData.data.length > 0, "User has purchased tickets in list");
  } catch (err) {
    assert(false, `Ticket suite error: ${err.message}`);
  }

  // 5. VENDORS DIRECTORY
  console.log("\n▶ TEST SUITE 5: Event Vendors & Service Profiles");
  try {
    // 5a. Create Vendor Profile
    const venCreateRes = await fetch(`${BASE_URL}/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: "Prime Sound & Lighting Ghana",
        description: "Professional concert sound systems and ambient venue lighting.",
        categories: ["Sound", "Lighting"],
        city: "Accra",
        contact: { phone: "+233201234567", email: "contact@primesound.gh" },
      }),
    });
    const venCreateData = await venCreateRes.json();
    assert(venCreateRes.status === 201, "Create vendor returns 201 Created");
    assert(venCreateData.data.name === "Prime Sound & Lighting Ghana", "Vendor name stored correctly");

    // 5b. Fetch Vendors List
    const getVenRes = await fetch(`${BASE_URL}/vendors`);
    const getVenData = await getVenRes.json();
    assert(getVenRes.status === 200, "Get vendors returns 200 OK");
    assert(getVenData.data.some(v => v.name === "Prime Sound & Lighting Ghana"), "Vendor list includes created profile");
  } catch (err) {
    assert(false, `Vendor suite error: ${err.message}`);
  }

  // 6. ORGANIZER STATS & TEARDOWN
  console.log("\n▶ TEST SUITE 6: Organizer Analytics & Cleanup");
  try {
    // 6a. Get Organizer Stats
    const statsRes = await fetch(`${BASE_URL}/events/organizers/stats`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200, "Get organizer stats returns 200 OK");
    assert(statsData.data.totalEvents >= 1, "Organizer stats counts created events");
    assert(statsData.data.totalTicketsSold >= 2, "Organizer stats tracks sold tickets (>= 2)");
    assert(statsData.data.totalRevenue >= 60, "Organizer stats tracks total revenue (>= GHS/USD 60)");

    // 6b. Delete Test Event (Teardown)
    const delRes = await fetch(`${BASE_URL}/events/${createdEventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert(delRes.status === 200, "Delete created test event returns 200 OK (Teardown successful)");
  } catch (err) {
    assert(false, `Organizer stats suite error: ${err.message}`);
  }

  // TEST SUMMARY REPORT
  console.log("\n=================================================");
  console.log("📊 TEST EXECUTION SUMMARY REPORT");
  console.log("=================================================");
  console.log(`Total Assertions Executed : ${stats.total}`);
  console.log(`Passed Assertions         : ${stats.passed} ✅`);
  console.log(`Failed Assertions         : ${stats.failed} ❌`);

  if (stats.failed === 0) {
    console.log("\n🎉 CONGRATULATIONS! ALL BACKEND & MONGODB ATLAS TESTS PASSED PERFECTLY!");
  } else {
    console.log("\n⚠️ Failures Detail:");
    stats.failures.forEach((f, idx) => console.log(`  ${idx + 1}. ${f}`));
    process.exit(1);
  }
}

runTests();
