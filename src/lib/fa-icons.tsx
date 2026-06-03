import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {
  faBolt, faShieldHalved, faGlobe, faChartColumn, faRocket, faRotate,
  faGears, faCircleCheck, faLayerGroup, faCode, faWifi, faPhone, faDesktop,
  faCalendarDays, faDollarSign, faUsers, faWandMagicSparkles, faComments,
  faClock, faStore, faTicket, faChevronDown, faRobot, faHeart, faAt,
  faBookOpen, faGear, faPlay, faImage, faStar, faArrowRight,
  faCircleQuestion, faFileLines, faChartLine, faEnvelopeOpenText,
  faPalette, faLifeRing, faKey, faBell, faCreditCard, faPlug,
  faMapLocationDot, faMagnifyingGlass, faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const wrap = (icon: any) =>
  ({ className, ...rest }: { className?: string } & Omit<FontAwesomeIconProps, "icon">) =>
    <FontAwesomeIcon icon={icon} className={className} {...rest} />;

export const Zap = wrap(faBolt);
export const Shield = wrap(faShieldHalved);
export const Globe = wrap(faGlobe);
export const BarChart3 = wrap(faChartColumn);
export const Rocket = wrap(faRocket);
export const RefreshCw = wrap(faRotate);
export const Settings2 = wrap(faGears);
export const CheckCircle = wrap(faCircleCheck);
export const Layers = wrap(faLayerGroup);
export const Code2 = wrap(faCode);
export const Wifi = wrap(faWifi);
export const Phone = wrap(faPhone);
export const Monitor = wrap(faDesktop);
export const Calendar = wrap(faCalendarDays);
export const DollarSign = wrap(faDollarSign);
export const Users = wrap(faUsers);
export const Sparkles = wrap(faWandMagicSparkles);
export const MessageSquare = wrap(faComments);
export const Clock = wrap(faClock);
export const Store = wrap(faStore);
export const Ticket = wrap(faTicket);
export const ChevronDown = wrap(faChevronDown);
export const Bot = wrap(faRobot);
export const Heart = wrap(faHeart);
export const AtSign = wrap(faAt);
export const BookOpen = wrap(faBookOpen);
export const Settings = wrap(faGear);
export const Play = wrap(faPlay);
export const ImageIcon = wrap(faImage);
export const SparklesAlt = wrap(faStar);
export const ArrowRight = wrap(faArrowRight);
export const HelpCircle = wrap(faCircleQuestion);
export const FileText = wrap(faFileLines);
export const LineChart = wrap(faChartLine);
export const Mail = wrap(faEnvelopeOpenText);
export const Palette = wrap(faPalette);
export const LifeRing = wrap(faLifeRing);
export const Key = wrap(faKey);
export const Bell = wrap(faBell);
export const CreditCard = wrap(faCreditCard);
export const Plug = wrap(faPlug);
export const Map = wrap(faMapLocationDot);
export const Search = wrap(faMagnifyingGlass);
export const Send = wrap(faPaperPlane);
