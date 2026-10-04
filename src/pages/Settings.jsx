import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/tn-seo-pages.css";

import {
  Activity,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  Camera,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  FolderKanban,
  Home,
  Link2,
  Menu,
  Puzzle,
  Search,
  Settings,
  Shield,
  SlidersHorizontal,
  Sparkles,
  User,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: Home,
    to: "/dashboard",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    to: "/projects",
  },
  {
    name: "Website Audit",
    icon: Shield,
  },
  {
    name: "Keyword Research",
    icon: Search,
  },
  {
    name: "Technical SEO",
    icon: SlidersHorizontal,
    to: "/technical-seo",
  },
  {
    name: "Content / AI Writer",
    icon: FileText,
    to: "/content",
  },
  {
    name: "On-Page SEO",
    icon: FileText,
    to: "/on-page-seo",
  },
  {
    name: "Backlink Analysis",
    icon: Link2,
    to: "/backlinks",
  },
  {
    name: "Rank Tracking",
    icon: Activity,
    to: "/rank-tracking",
  },
  {
    name: "Competitor Analysis",
    icon: Users,
    to: "/competitor-analysis",
  },
  {
    name: "Reports",
    icon: FileText,
    to: "/reports",
  },
  {
    name: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

const tabs = [
  {
    name: "Profile",
    icon: User,
  },
  {
    name: "Company",
    icon: Building2,
  },
  {
    name: "Integrations",
    icon: Link2,
  },
  {
    name: "Notifications",
    icon: Bell,
  },
  {
    name: "Billing",
    icon: CreditCard,
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="logo-ring">
        <ArrowUpRight className="logo-arrow" strokeWidth={3} />
      </div>

      <div className="leading-tight">
        <div className="text-[20px] font-bold tracking-tight text-white">
          TN SEO
          <sup className="ml-0.5 text-[8px]">®</sup>
        </div>

        <div className="text-[15px] font-medium tracking-[1px] text-white/90">
          MODULE
        </div>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, setMobileOpen }) {
  const [activeItem, setActiveItem] = useState("Settings");

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`desktop-sidebar ${
          mobileOpen ? "mobile-open" : ""
        } fixed left-0 top-0 z-50 flex h-screen w-[205px] flex-col bg-[#003b35] text-white transition-transform duration-300 md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-4 pb-5 pt-4">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = item.to
              ? location.pathname === item.to
              : activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.to) {
                    navigate(item.to);
                  } else {
                    setActiveItem(item.name);
                  }
                  setMobileOpen(false);
                }}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-[10px] text-left text-[14px] transition ${
                  active
                    ? "bg-[#07965b] font-semibold shadow-sm"
                    : "text-white/95 hover:bg-white/10"
                }`}
              >
                <Icon size={20} strokeWidth={1.9} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

  
        {/* User */}
        
      </aside>
    </>
  );
}

function Topbar({ setMobileOpen }) {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-[63px] items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:ml-[205px] md:px-7">
      <button
        className="mr-3 rounded-lg p-2 hover:bg-slate-100 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>
      {/* Back to Home */}

<button
  type="button"
  onClick={() => navigate("/")}
  className="
    flex
    h-10
    items-center
    gap-4
    rounded-lg
    border
    border-slate-200
    bg-white
    px-6
    text-sm
    font-semibold
    text-slate-700
    hover:bg-slate-50
    mr-8
  "
>
  <ArrowLeft
    size={17}
  />

  Back to Home

</button>

      <div className="relative w-full max-w-[505px] mr-8">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search settings, integrations, or any option..."
          className="h-[40px] w-full rounded-lg border border-slate-200 bg-white pl-10 pr-20 text-[13px] text-slate-700 shadow-sm placeholder:text-slate-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-5">
        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={21} />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#003b35] text-white sm:flex">
            U
          </div>

          <div className="hidden leading-tight sm:block">
            <div className="text-[13px] text-slate-600">
              Good Evening,
            </div>

            <div className="text-[14px] font-bold text-slate-900">
              Utsav 
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-45px h-[46px] w-[46px] shrink-0 items-center justify-center rounded-lg bg-[#eafaf3] text-[#079e61]">
        <Icon size={25} strokeWidth={2} />
      </div>

      <div>
        <h2 className="text-[16px] font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 text-[12px] text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="h-[39px] w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-700 shadow-sm transition focus:border-[#079e61] focus:ring-2 focus:ring-[#079e61]/10"
      />
    </label>
  );
}

function SaveButton({ onClick }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onClick?.();

    setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  return (
    <button
      onClick={handleSave}
      className="flex h-[37px] items-center gap-2 rounded-md bg-[#079e61] px-5 text-[12px] font-bold text-white shadow-button transition hover:bg-[#078d57]"
    >
      {saved ? (
        <>
          <Check size={15} />
          Saved
        </>
      ) : (
        "Save Changes"
      )}
    </button>
  );
}

function ProfileCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState(
    ""
  );

  const handlePhoto = () => {
    alert("Photo upload functionality can be connected here.");
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">
      <SectionHeader
        icon={User}
        title="Profile Settings"
        description="Manage your personal information and account preferences."
      />

      <div className="grid gap-5 sm:grid-cols-[145px_1fr]">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="flex h-[108px] w-[108px] items-center justify-center rounded-full bg-[#003b35] text-[43px] text-white">
              U
            </div>

            <button
              onClick={handlePhoto}
              className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white shadow-md hover:bg-slate-50"
              title="Change photo"
            >
              <Camera size={17} />
            </button>
          </div>

          <button
            onClick={handlePhoto}
            className="mt-4 h-[38px] w-[135px] rounded-md border border-slate-200 bg-white text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            Change Photo
          </button>
        </div>

        {/* Form */}
        <div className="space-y-2.5">
          <InputField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
              Timezone
            </span>

            <div className="relative">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="h-[39px] w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] text-slate-700 shadow-sm focus:border-[#079e61]"
              >
                <option>
                  Asia/Kolkata (GMT +5:30)
                </option>
                <option>
                  Europe/London (GMT +0:00)
                </option>
                <option>
                  America/New_York (GMT -5:00)
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </label>

          <div className="flex justify-end pt-1">
            <SaveButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function AccountOverview() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-2 shadow-card md:p-[18px] h-[300px]">
      <SectionHeader
        icon={BarChart3}
        title="Account Overview"
        description="Your current plan and usage details."
      />

      <div className="overflow-hidden rounded-lg border border-[#bdeed8]">
      
        <div className="space-y-4 p-3">
          <ProgressRow
            title="Projects"
            current="3"
            total="5"
            percent={60}
          />

          <ProgressRow
            title="Reports Generated"
            current="12"
            total="50"
            percent={24}
          />

          <ProgressRow
            title="Team Members"
            current="1"
            total="3"
            percent={33}
          />
        </div>
      </div>
    </section>
  );
}

function ProgressRow({
  title,
  current,
  total,
  percent,
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[12px]">
        <span className="font-semibold text-slate-700">
          {title}
        </span>

        <span className="font-semibold text-slate-600">
          {current} / {total}
        </span>
      </div>

      <div className="h-[10px] overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#079e61] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function CompanyCard() {
  const [company, setCompany] = useState(
    "TN Nexora Technologies"
  );

  const [website, setWebsite] = useState(
    "https://tnnexora.com"
  );

  const [industry, setIndustry] = useState("IT Services");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">
      <SectionHeader
        icon={Building2}
        title="Company Information"
        description="Set your company details and branding."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <InputField
          label="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <InputField
          label="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <label className="block sm:max-w-[213px]">
          <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
            Industry
          </span>

          <div className="relative">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="h-[39px] w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] text-slate-700"
            >
              <option>IT Services</option>
              <option>Digital Marketing</option>
              <option>E-commerce</option>
              <option>Software Development</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <SaveButton />
      </div>
    </section>
  );
}

function IntegrationsCard() {
  const [connections, setConnections] = useState({
    searchConsole: true,
    analytics: true,
    other: false,
  });

  const toggle = (name) => {
    setConnections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">
      <SectionHeader
        icon={Link2}
        title="Integrations"
        description="Connect your favorite tools and services."
      />

      <div className="space-y-2">
        <IntegrationRow
          logo="G"
          logoClass="text-red-500"
          title="Google Search Console"
          description="Fetch indexing and search data."
          connected={connections.searchConsole}
          onClick={() => toggle("searchConsole")}
        />

        <IntegrationRow
          logo="▮"
          logoClass="text-orange-500"
          title="Google Analytics"
          description="Track traffic and user behavior."
          connected={connections.analytics}
          onClick={() => toggle("analytics")}
        />

        <IntegrationRow
          icon={Puzzle}
          title="Other Integrations"
          description="Connect tools like Looker Studio, Slack, etc."
          connected={connections.other}
          onClick={() => toggle("other")}
          other
        />
      </div>
    </section>
  );
}

function IntegrationRow({
  logo,
  logoClass,
  icon: Icon,
  title,
  description,
  connected,
  onClick,
  other,
}) {
  return (
    <div className="flex min-h-[67px] items-center gap-3 rounded-lg border border-slate-200 px-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xl font-bold ${logoClass || "text-[#079e61]"}`}
      >
        {Icon ? (
          <Icon size={29} />
        ) : (
          logo
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold text-slate-800">
          {title}
        </div>

        <div className="truncate text-[11px] text-slate-500">
          {description}
        </div>
      </div>

      {other ? (
        <button
          onClick={onClick}
          className={`rounded-md border px-3 py-2 text-[11px] font-bold ${
            connected
              ? "border-[#079e61] bg-[#079e61] text-white"
              : "border-[#75d7ae] text-[#079e61] hover:bg-[#effcf7]"
          }`}
        >
          {connected ? "Connected" : "+ Connect"}
        </button>
      ) : (
        <>
          <button
            onClick={onClick}
            className={`rounded-md px-3 py-2 text-[11px] font-bold ${
              connected
                ? "bg-[#d9f8e9] text-[#079e61]"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {connected ? "Connected" : "Connect"}
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50">
            <Settings size={17} />
          </button>
        </>
      )}
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
}) {
  return (
    <button
      onClick={onChange}
      className={`relative h-[24px] w-[42px] shrink-0 rounded-full transition ${
        enabled
          ? "bg-[#079e61]"
          : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition ${
          enabled
            ? "left-[21px]"
            : "left-[3px]"
        }`}
      />
    </button>
  );
}

function NotificationsCard() {
  const [notifications, setNotifications] = useState({
    project: true,
    audit: true,
    ranking: true,
    weekly: false,
  });

  const change = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const rows = [
    ["Project updates", "project"],
    ["SEO audit completion", "audit"],
    ["Ranking changes", "ranking"],
    ["Weekly email summary", "weekly"],
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">
      <SectionHeader
        icon={Bell}
        title="Notifications"
        description="Choose what you want to be notified about."
      />

      <div className="divide-y divide-slate-100">
        {rows.map(([label, key]) => (
          <div
            key={key}
            className="flex items-center justify-between py-2.5"
          >
            <span className="text-[12px] text-slate-700">
              {label}
            </span>

            <Toggle
              enabled={notifications[key]}
              onChange={() => change(key)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function SecurityCard() {
  const [twoFactor, setTwoFactor] = useState(false);

  const changePassword = () => {
    alert("Change Password dialog can be connected here.");
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">
      <SectionHeader
        icon={Shield}
        title="Security"
        description="Manage your account security."
      />

      <div className="divide-y divide-slate-100">
        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <div className="text-[12px] font-semibold text-slate-800">
              Change Password
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              Update your password regularly for better security.
            </div>
          </div>

          <button
            onClick={changePassword}
            className="shrink-0 rounded-md border border-slate-200 px-4 py-2.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
          >
            Change Password
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <div className="text-[12px] font-semibold text-slate-800">
              Two-Factor Authentication
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              Add an extra layer of security to your account.
            </div>
          </div>

          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`shrink-0 rounded-md border px-4 py-2.5 text-[11px] font-bold ${
              twoFactor
                ? "border-[#079e61] bg-[#079e61] text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {twoFactor ? "2FA Enabled" : "Enable 2FA"}
          </button>
        </div>
      </div>
    </section>
  );
}

function SecurityBanner() {
  const [enabled, setEnabled] = useState(false);

  return (
    <section className="security-banner flex flex-col gap-4 rounded-xl border border-[#bdeed8] bg-[#effcf7] p-4 shadow-sm sm:flex-row sm:items-center md:px-6 md:py-4">
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[#003b35]">
        <Shield size={40} strokeWidth={2.2} />
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-[15px] font-bold text-slate-900">
          Keep Your Account Secure
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-600">
          Enable two-factor authentication and keep your information safe.
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className="relative z-10 flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#079e61] px-5 py-3 text-[12px] font-bold text-white shadow-button hover:bg-[#078d57]"
      >
        {enabled ? "2FA Enabled" : "Enable 2FA"}
        <ArrowRight size={15} />
      </button>
    </section>
  );
}

/* =========================================================
   COMPANY PAGE
========================================================= */


 function CompanyPage() {
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("companyName") || "TN Nexora Technologies"
  );

  const [website, setWebsite] = useState(
    localStorage.getItem("website") || "https://tnnexora.com"
  );

  const [industry, setIndustry] = useState(
    localStorage.getItem("industry") || "IT Services"
  );

  const [companySize, setCompanySize] = useState(
    localStorage.getItem("companySize") || "1–10 employees"
  );

  const [address, setAddress] = useState(
    localStorage.getItem("address") || "Durgapur, West Bengal, India"
  );

  const [domain, setDomain] = useState(
    localStorage.getItem("domain") || "tnnexora.com"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  const [timezone, setTimezone] = useState(
    localStorage.getItem("timezone") || "Asia/Kolkata (GMT +5:30)"
  );

    const handleSaveChanges = () => {
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("website", website);
    localStorage.setItem("industry", industry);
    localStorage.setItem("companySize", companySize);
    localStorage.setItem("address", address);
    localStorage.setItem("domain", domain);
    localStorage.setItem("language", language);
    localStorage.setItem("timezone", timezone);

    alert("Company information saved successfully!");
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1.55fr_0.85fr]">

      {/* LEFT SIDE */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

        <SectionHeader
          icon={Building2}
          title="Company Information"
          description="Update your company details and branding."
        />

        <div className="space-y-3">

          <InputField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <InputField
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <div className="grid gap-3 sm:grid-cols-2">

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
                Industry
              </span>

              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="h-[39px] w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] text-slate-700"
                >
                  <option>IT Services</option>
                  <option>Digital Marketing</option>
                  <option>E-commerce</option>
                  <option>Software Development</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
                Company Size
              </span>

              <div className="relative">
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="h-[39px] w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] text-slate-700"
                >
                  <option>1–10 employees</option>
                  <option>11–50 employees</option>
                  <option>51–200 employees</option>
                  <option>201–500 employees</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </label>

          </div>

          <InputField
            label="Address (Optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Logo */}
          <div>
            <span className="mb-2 block text-[12px] font-medium text-slate-700">
              Logo
            </span>

            <div className="flex items-center gap-4">

              <div className="flex h-[70px] w-[75px] items-center justify-center rounded-lg border border-slate-200 bg-white">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#003b35] text-[20px] font-semibold text-white">
                  TN
                </div>
              </div>

              <div>
                <button className="rounded-md border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50">
                  Change Logo
                </button>

                <p className="mt-1 text-[10px] text-slate-400">
                  PNG, JPG (Max 2MB)
                </p>
              </div>

            </div>
          </div>

          <div className="flex justify-end pt-2">
           <button
  type="button"
  onClick={handleSaveChanges}
  className="rounded-md bg-[#079e61] px-5 py-2.5 text-[12px] font-bold text-white shadow-button hover:bg-[#078d57]"
>
  Save Changes
</button>
          </div>

        </div>
      </section>


      {/* RIGHT SIDE */}
      <div className="space-y-4">

        {/* Brand Preview */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

          <SectionHeader
            icon={Sparkles}
            title="Brand Preview"
            description="This is how your company details may appear in reports."
          />

          <div className="rounded-lg border border-slate-100 bg-white p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#003b35] text-[18px] font-semibold text-white">
                TN
              </div>

              <div>
                <div className="text-[13px] font-bold text-slate-900">
                  TN Nexora Technologies
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  https://tnnexora.com
                </div>

                <div className="text-[11px] text-slate-500">
                  IT Services
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* Company Preferences */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

          <SectionHeader
            icon={SlidersHorizontal}
            title="Company Preferences"
            description="Default"
          />

          <div className="space-y-3">

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
                Default Domain
              </span>

              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="h-[39px] w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-700"
              >
                <option>tnnexora.com</option>
                <option>www.tnnexora.com</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
                Default Language
              </span>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="h-[39px] w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-700"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
                Timezone
              </span>

              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="h-[39px] w-full rounded-md border border-slate-200 bg-white px-3 text-[13px] text-slate-700"
              >
                <option>Asia/Kolkata (GMT +5:30)</option>
                <option>Europe/London (GMT +0:00)</option>
                <option>America/New_York (GMT -5:00)</option>
              </select>
            </label>

          </div>

        </section>

      </div>
    </div>
  );
}


/* =========================================================
   INTEGRATIONS PAGE
========================================================= */

function IntegrationsPage() {

  const [connections, setConnections] = useState({
    searchConsole: true,
    analytics: true,
    sheets: false,
    drive: false,
    looker: false,
    slack: false,
  });

  const toggleConnection = (name) => {
    setConnections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const integrationData = [
    {
      key: "searchConsole",
      title: "Google Search Console",
      description: "Fetch indexing and search performance data.",
      icon: "G",
      color: "text-blue-500",
    },
    {
      key: "analytics",
      title: "Google Analytics",
      description: "Track website traffic and user behavior.",
      icon: "▮",
      color: "text-orange-500",
    },
    {
      key: "sheets",
      title: "Google Sheets",
      description: "Export reports and data directly to Sheets.",
      icon: "▦",
      color: "text-green-600",
    },
    {
      key: "drive",
      title: "Google Drive",
      description: "Save and store reports automatically.",
      icon: "△",
      color: "text-blue-500",
    },
    {
      key: "looker",
      title: "Looker Studio",
      description: "Create dashboards and visualize data.",
      icon: "◯",
      color: "text-blue-500",
    },
    {
      key: "slack",
      title: "Slack",
      description: "Get notifications and alerts in your Slack workspace.",
      icon: "✣",
      color: "text-pink-500",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

      <SectionHeader
        icon={Link2}
        title="Integrations"
        description="Connect your favorite tools and services to improve your SEO workflow."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {integrationData.map((item) => {
          const connected = connections[item.key];

          return (
            <div
              key={item.key}
              className="min-h-[135px] rounded-lg border border-slate-200 p-3.5"
            >

              <div className="flex items-start gap-3">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center text-[25px] font-bold ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="text-[12px] font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    {item.description}
                  </p>
                </div>

              </div>

              <div className="mt-4">

                <div className="mb-2 flex justify-center">
                  <span
                    className={`rounded-md px-3 py-1 text-[10px] font-semibold ${
                      connected
                        ? "bg-[#d9f8e9] text-[#079e61]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {connected ? "Connected" : "Not Connected"}
                  </span>
                </div>

                <button
                  onClick={() => toggleConnection(item.key)}
                  className={`h-[32px] w-full rounded-md text-[11px] font-bold ${
                    connected
                      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      : "bg-[#079e61] text-white hover:bg-[#078d57]"
                  }`}
                >
                  {connected ? "Manage" : "Connect"}
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}


/* =========================================================
   NOTIFICATIONS PAGE
========================================================= */

function NotificationsPage() {

  const [email, setEmail] = useState("utsavojha@example.com");
  const [, setSavedEmail] = useState("utsavojha@example.com");

  const [notifications, setNotifications] = useState({
    project: true,
    audit: true,
    ranking: true,
    backlink: true,
    weekly: false,
    product: true,
    inApp: true,
  });

  const toggleNotification = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const notificationRows = [
    {
      key: "project",
      title: "Project updates",
      description: "Get notified about project audit completion.",
    },
    {
      key: "audit",
      title: "SEO audit completion",
      description: "Receive alerts when a website audit is finished.",
    },
    {
      key: "ranking",
      title: "Ranking changes",
      description: "Get notified about significant keyword ranking changes.",
    },
    {
      key: "backlink",
      title: "Backlink alerts",
      description: "Get notified about new or lost backlinks.",
    },
    {
      key: "weekly",
      title: "Weekly email summary",
      description: "Receive a weekly summary of your SEO performance.",
    },
    {
      key: "product",
      title: "Product updates",
      description: "Get the latest news and feature updates.",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">

      {/* Notification Preferences */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

        <SectionHeader
          icon={Bell}
          title="Notification Preferences"
          description="Choose what you want to be notified about."
        />

        <div>

          {notificationRows.map((item) => (

            <div
              key={item.key}
              className="flex items-center justify-between gap-4 border-b border-slate-100 py-3"
            >

              <div className="flex items-start gap-3">

                <Bell
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-700"
                />

                <div>
                  <div className="text-[12px] font-semibold text-slate-800">
                    {item.title}
                  </div>

                  <div className="mt-0.5 text-[10px] text-slate-500">
                    {item.description}
                  </div>
                </div>

              </div>

              <Toggle
                enabled={notifications[item.key]}
                onChange={() => toggleNotification(item.key)}
              />

            </div>

          ))}

        </div>

        <div className="flex justify-end pt-4">

          <button
            className="rounded-md bg-[#079e61] px-5 py-2.5 text-[12px] font-bold text-white hover:bg-[#078d57]"
          >
            Save Preferences
          </button>

        </div>

      </section>


      {/* RIGHT SIDE */}
      <div className="space-y-4">

        {/* Email Notifications */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

          <SectionHeader
            icon={FileText}
            title="Email Notifications"
            description="All important updates will be sent to this email."
          />

          <label className="block">

            <span className="mb-1.5 block text-[12px] font-medium text-slate-700">
              Email Address
            </span>

            <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="h-[39px] w-full rounded-md border border-slate-200 px-3 text-[12px]"
/>

          </label>

          <div className="flex justify-end pt-3">

            <button
  type="button"
  onClick={() => {
    setSavedEmail(email);
    alert(`Email updated to: ${email}`);
  }}
  className="rounded-md bg-[#079e61] px-5 py-2.5 text-[11px] font-bold text-white"
>
  Update Email
</button>

          </div>

        </section>


        {/* Instant Notifications */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

          <SectionHeader
            icon={Sparkles}
            title="Instant Notifications"
            description="Enable in-app notifications for real-time alerts."
          />

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">

            <div className="flex items-center gap-2">

              <Activity
                size={17}
                className="text-[#079e61]"
              />

              <span className="text-[12px] font-semibold text-slate-700">
                In-app notifications
              </span>

            </div>

            <Toggle
              enabled={notifications.inApp}
              onChange={() => toggleNotification("inApp")}
            />

          </div>

        </section>

      </div>

    </div>
  );
}


/* =========================================================
   BILLING PAGE
========================================================= */

function BillingPage() {

  return (
    <div className="space-y-4">

      {/* Current Plan + Usage */}
      <div className="grid gap-4 lg:grid-cols-[1.55fr_0.85fr]">

        {/* Current Plan */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

          <SectionHeader
            icon={CreditCard}
            title="Current Plan"
            description="You are currently on the Free plan."
          />

          <div className="rounded-lg border border-slate-100 p-4">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>
                <div className="text-[18px] font-bold text-slate-900">
                  Free Plan
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  Free plan includes essential SEO tools.
                </div>
              </div>

              <button className="rounded-md bg-[#079e61] px-5 py-2.5 text-[11px] font-bold text-white">
                Upgrade Plan →
              </button>

            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">

              {[
                "5 website audits per month",
                "Basic SEO reports",
                "Limited keyword tracking",
                "Access to essential tools",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-2 text-[11px] text-slate-600"
                >
                  <Check
                    size={15}
                    className="rounded-full bg-[#d9f8e9] p-0.5 text-[#079e61]"
                  />
                  {item}
                </div>

              ))}

            </div>

          </div>

        </section>


        {/* Usage Overview */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

          <SectionHeader
            icon={BarChart3}
            title="Usage Overview"
            description="Your current monthly usage."
          />

          <div className="space-y-4">

            <ProgressRow
              title="Website Audits"
              current="3"
              total="5"
              percent={60}
            />

            <ProgressRow
              title="Keyword Tracking"
              current="12"
              total="50"
              percent={24}
            />

            <ProgressRow
              title="Reports Generated"
              current="8"
              total="20"
              percent={40}
            />

          </div>

        </section>

      </div>


      {/* Available Plans */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

        <SectionHeader
          icon={Sparkles}
          title="Available Plans"
          description="Choose a plan that fits your needs."
        />

        <div className="grid gap-3 md:grid-cols-3">

          {/* Free */}
          <div className="rounded-lg border border-slate-200 p-4">

            <div className="text-[13px] font-bold text-slate-900">
              Free
            </div>

            <div className="mt-1 text-[18px] font-bold">
              ₹0
              <span className="text-[10px] font-normal text-slate-500">
                /month
              </span>
            </div>

            <div className="mt-3 space-y-2">

              <div className="text-[10px] text-slate-600">
                ✓ 5 audits / month
              </div>

              <div className="text-[10px] text-slate-600">
                ✓ Basic reports
              </div>

              <div className="text-[10px] text-slate-600">
                ✓ Limited tracking
              </div>

            </div>

            <button className="mt-4 w-full rounded-md border border-[#079e61] py-2 text-[11px] font-bold text-[#079e61]">
              Current Plan
            </button>

          </div>


          {/* Pro */}
          <div className="rounded-lg border border-slate-200 p-4">

            <div className="flex items-center justify-between">

              <div className="text-[13px] font-bold text-slate-900">
                Pro
              </div>

              <span className="rounded-full bg-[#079e61] px-2 py-1 text-[9px] font-bold text-white">
                Popular
              </span>

            </div>

            <div className="mt-1 text-[18px] font-bold">
              ₹499
              <span className="text-[10px] font-normal text-slate-500">
                /month
              </span>
            </div>

            <div className="mt-3 space-y-2">

              <div className="text-[10px] text-slate-600">
                ✓ Unlimited audits
              </div>

              <div className="text-[10px] text-slate-600">
                ✓ Advanced reports
              </div>

              <div className="text-[10px] text-slate-600">
                ✓ AI SEO tools
              </div>

            </div>

            <button className="mt-4 w-full rounded-md bg-[#079e61] py-2 text-[11px] font-bold text-white">
              Upgrade Now
            </button>

          </div>


          {/* Business */}
          <div className="rounded-lg border border-slate-200 p-4">

            <div className="text-[13px] font-bold text-slate-900">
              Business
            </div>

            <div className="mt-1 text-[18px] font-bold">
              ₹999
              <span className="text-[10px] font-normal text-slate-500">
                /month
              </span>
            </div>

            <div className="mt-3 space-y-2">

              <div className="text-[10px] text-slate-600">
                ✓ Everything in Pro
              </div>

              <div className="text-[10px] text-slate-600">
                ✓ Multiple projects
              </div>

              <div className="text-[10px] text-slate-600">
                ✓ Team members
              </div>

            </div>

            <button className="mt-4 w-full rounded-md bg-[#079e61] py-2 text-[11px] font-bold text-white">
              Upgrade Now
            </button>

          </div>

        </div>

      </section>


      {/* Payment History */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-card md:p-[18px]">

        <SectionHeader
          icon={CreditCard}
          title="Payment History"
          description="View your past transactions."
        />

        <div className="overflow-x-auto">

          <table className="w-full min-w-[550px] text-left">

            <thead>
              <tr className="border-b border-slate-100 text-[11px] text-slate-500">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 text-right font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>

              {[
                ["Aug 15, 2026", "Pro Plan", "₹499", "Paid"],
                ["Jul 15, 2026", "Pro Plan", "₹499", "Paid"],
                ["Jun 15, 2026", "Pro Plan", "₹499", "Paid"],
              ].map((payment) => (

                <tr
                  key={payment[0]}
                  className="border-b border-slate-100 text-[11px]"
                >

                  <td className="py-3 text-slate-700">
                    {payment[0]}
                  </td>

                  <td className="py-3 text-slate-700">
                    {payment[1]}
                  </td>

                  <td className="py-3 font-semibold text-slate-800">
                    {payment[2]}
                  </td>

                  <td className="py-3 text-right">

                    <span className="rounded-md bg-[#d9f8e9] px-3 py-1 text-[10px] font-semibold text-[#079e61]">
                      {payment[3]}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <Topbar setMobileOpen={setMobileOpen} />

      <main className="md:ml-[205px]">
        <div className="mx-auto max-w-[1040px] px-4 py-5 md:px-6 md:py-5 lg:px-7">
          {/* Page heading */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[32px] font-bold leading-tight tracking-[-1.2px] text-slate-950 md:text-[36px]">
                Settings
              </h1>

              <p className="mt-1 text-[14px] text-slate-500">
                Manage your account, preferences, and integrations.
              </p>
            </div>

           <button
  type="button"
  onClick={() => setActiveTab("Profile")}
  className="flex h-[42px] items-center justify-center gap-2 rounded-md border border-[#5acb9a] px-5 text-[12px] font-bold text-[#078d57] hover:bg-[#effcf7]"
>
  View Profile
  <ArrowRight size={16} />
</button>
          </div>

          {/* Tabs */}
          <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex h-[48px] items-center justify-center gap-2 border-b-2 text-[12px] font-semibold transition ${
                    active
                      ? "border-[#079e61] bg-[#f5fffb] text-[#078d57]"
                      : "border-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Main cards */}
          {/* =========================================================
    MAIN SETTINGS PAGES
========================================================= */}

{activeTab === "Profile" && (
  <div className="space-y-3">

    <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
      <ProfileCard />
      <AccountOverview />
    </div>

    <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
      <CompanyCard />
      <IntegrationsCard />
    </div>

    <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
      <NotificationsCard />
      <SecurityCard />
    </div>

    <SecurityBanner />

  </div>
)}

{activeTab === "Company" && (
  <CompanyPage />
)}

{activeTab === "Integrations" && (
  <IntegrationsPage />
)}

{activeTab === "Notifications" && (
  <NotificationsPage />
)}

{activeTab === "Billing" && (
  <BillingPage />
)}
        </div>
      </main>
    </div>
  );
}

export default App;