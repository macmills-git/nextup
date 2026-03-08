import { useDesignVariant } from "@/contexts/DesignVariantContext";
import Footer from "@/components/Footer";
import SaasFooter from "@/components/landing/saas/SaasFooter";

const VariantFooter = () => {
  const { variant } = useDesignVariant();
  return variant === "saas" ? <SaasFooter /> : <Footer />;
};

export default VariantFooter;
