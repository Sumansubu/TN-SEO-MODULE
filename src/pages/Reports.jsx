import "../styles/tn-seo-pages.css";


import {
  useEffect,
  useRef,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import AppSidebar from "../components/AppSidebar";

import {
ArrowLeft,
ArrowRight,
Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  FileBarChart2,
  FileText,
  Globe2,
  Info,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  X
} from "lucide-react";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

import "../styles/tn-seo-pages.css";


/* =====================================================
   DEMO KEYWORD DATA
===================================================== */

const keywordData = [
  {
    keyword: "accurate rank tracker",
    rank: 1,
    change: 1,
    date: "2026-04-13"
  },

  {
    keyword: "accurate+rank+tracker",
    rank: 1,
    change: 1,
    date: "2026-04-13"
  },

  {
    keyword: "ai seo agent",
    rank: 1,
    change: 1,
    date: "2026-04-03"
  },

  {
    keyword: "analyse serp",
    rank: 1,
    change: 1,
    date: "2026-04-12"
  },

  {
    keyword: "best local rank tracker",
    rank: 1,
    change: 1,
    date: "2026-03-27"
  }
];


/* =====================================================
   MAIN APP
===================================================== */

export default function Reports() {

  const navigate =
    useNavigate();


  /* Sidebar */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  /* Domains */

  const [domains, setDomains] =
    useState([
      "nike.com",
      "adidas.com"
    ]);

  const [domainInput, setDomainInput] =
    useState("");


  /* Date */

  const [dateRange, setDateRange] =
    useState(
      "Apr 13, 2026 - Apr 13, 2026"
    );


  /* Schedule */

  const [schedule, setSchedule] =
    useState(false);


  /* White label */

  const [whiteLabel, setWhiteLabel] =
    useState("No logo");


  /* Format */

  const [format, setFormat] =
    useState("PDF");


  /* Report */

  const [generated, setGenerated] =
    useState(false);


  const [reportTitle, setReportTitle] =
    useState("SEO Analysis Report");


  /* Toast */

  const [toast, setToast] =
    useState("");


  /* More menu */

  const [menuOpen, setMenuOpen] =
    useState(false);


  /* Schedule modal */

  const [showScheduleModal, setShowScheduleModal] =
    useState(false);


  const [email, setEmail] =
    useState("client@example.com");


  const [frequency, setFrequency] =
    useState("Weekly");


  /* Report DOM reference */

  const reportRef = useRef(null);


  /* =====================================================
     TOAST AUTO CLOSE
  ===================================================== */

  useEffect(() => {

    if (!toast) return;

    const timer =
      setTimeout(() => {

        setToast("");

      }, 2500);

    return () =>
      clearTimeout(timer);

  }, [toast]);


  /* =====================================================
     SHOW MESSAGE
  ===================================================== */

  const notify = (message) => {

    setToast(message);

  };


  /* =====================================================
     ADD DOMAIN
  ===================================================== */

  const addDomain = () => {

    let value =
      domainInput
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "");


    if (!value) {

      return;

    }


    if (domains.includes(value)) {

      notify(
        "This domain is already added."
      );

      return;

    }


    if (domains.length >= 5) {

      notify(
        "Maximum 5 domains allowed."
      );

      return;

    }


    setDomains([
      ...domains,
      value
    ]);


    setDomainInput("");

  };


  /* =====================================================
     REMOVE DOMAIN
  ===================================================== */

  const removeDomain = (domain) => {

    setDomains(
      domains.filter(
        item => item !== domain
      )
    );

  };


  /* =====================================================
     GENERATE REPORT
  ===================================================== */

  const generateReport = () => {

    if (domains.length === 0) {

      notify(
        "Please add at least one domain."
      );

      return;

    }


    setGenerated(true);


    setReportTitle(
      `${domains[0]} SEO Analysis Report`
    );


    notify(
      "SEO report generated successfully."
    );

  };


  /* =====================================================
     CSV DOWNLOAD
  ===================================================== */

  const downloadCSV = () => {

    const rows = [
      [
        "Keyword",
        "Rank",
        "Evolution",
        "Last Change"
      ],

      ...keywordData.map(item => [
        item.keyword,
        item.rank,
        `+${item.change}`,
        item.date
      ])
    ];


    const csv =
      rows
        .map(row =>
          row
            .map(value =>
              `"${String(value)}"`
            )
            .join(",")
        )
        .join("\n");


    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );


    triggerDownload(
      blob,
      "tn-seo-report.csv"
    );


    notify(
      "CSV report downloaded."
    );

  };


  /* =====================================================
     HTML DOWNLOAD
  ===================================================== */

  const downloadHTML = () => {

    const html = `
<!doctype html>

<html>

<head>

<meta charset="UTF-8">

<title>
${reportTitle}
</title>

<style>

body {
  font-family: Arial;
  padding: 40px;
  color: #0f172a;
}

h1 {
  color: #087a4f;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
}

</style>

</head>

<body>

<h1>
${reportTitle}
</h1>

<p>
Generated SEO Report
</p>

<h2>
Keyword Rankings
</h2>

<table>

<tr>
<th>Keyword</th>
<th>Rank</th>
<th>Evolution</th>
<th>Last Change</th>
</tr>

${keywordData
  .map(
    item => `
<tr>

<td>
${item.keyword}
</td>

<td>
${item.rank}
</td>

<td>
↑ ${item.change}
</td>

<td>
${item.date}
</td>

</tr>
`
  )
  .join("")}

</table>

</body>

</html>
`;


    const blob =
      new Blob(
        [html],
        {
          type:
            "text/html"
        }
      );


    triggerDownload(
      blob,
      "tn-seo-report.html"
    );


    notify(
      "HTML report downloaded."
    );

  };


  /* =====================================================
     PDF DOWNLOAD
  ===================================================== */

  const downloadPDF = async () => {

    if (!reportRef.current) {

      return;

    }


    notify(
      "Preparing PDF..."
    );


    const canvas =
      await html2canvas(
        reportRef.current,
        {
          scale: 1.5,
          backgroundColor:
            "#ffffff"
        }
      );


    const image =
      canvas.toDataURL(
        "image/png"
      );


    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );


    const pageWidth =
      pdf.internal.pageSize.getWidth();


    const pageHeight =
      pdf.internal.pageSize.getHeight();


    const margin = 8;


    const imageWidth =
      pageWidth - margin * 2;


    const imageHeight =
      canvas.height *
      imageWidth /
      canvas.width;


    pdf.addImage(
      image,
      "PNG",
      margin,
      margin,
      imageWidth,
      imageHeight
    );


    let remaining =
      imageHeight -
      (pageHeight - margin * 2);


    while (remaining > 0) {

      pdf.addPage();

      pdf.addImage(
        image,
        "PNG",
        margin,
        margin - (
          imageHeight -
          remaining
        ),
        imageWidth,
        imageHeight
      );

      remaining -=
        pageHeight -
        margin * 2;

    }


    pdf.save(
      "tn-seo-report.pdf"
    );


    notify(
      "PDF report downloaded."
    );

  };


  /* =====================================================
     DOWNLOAD REPORT
  ===================================================== */

  const downloadReport = () => {

    if (format === "CSV") {

      downloadCSV();

      return;

    }


    if (format === "HTML") {

      downloadHTML();

      return;

    }


    downloadPDF();

  };


  /* =====================================================
     SEND REPORT
  ===================================================== */

  const sendReport = () => {

    notify(
      `Report sent to ${email}`
    );

  };


  /* =====================================================
     JSX
  ===================================================== */

  return (

    <div className="min-h-screen bg-[#f7fafc]">

      {/* ================================================
          SIDEBAR
      ================================================= */}

      <AppSidebar
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
        onSelect={notify}
      />


      {/* ================================================
          MAIN
      ================================================= */}

      <main
        className="
          lg:pl-[228px]
        "
      >

        {/* ==============================================
            HEADER
        =============================================== */}

        <header
          className="
            sticky
            top-0
            z-20
            border-b
            border-slate-200
            bg-white/95
            px-4
            py-3
            backdrop-blur
            md:px-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* Mobile Menu */}

            <button
              className="
                rounded-lg
                border
                border-slate-200
                p-2
                lg:hidden
              "

              onClick={() =>
                setSidebarOpen(true)
              }
            >

              <Menu
                size={20}
              />

            </button>
            
            {/* Back to Home */}

<button
  type="button"
  onClick={() => navigate("/")}
  className="
    hidden
    h-10
    items-center
    gap-2
    rounded-lg
    border
    border-slate-200
    bg-white
    px-6
    text-sm
    font-semibold
    text-slate-700
    hover:bg-slate-50
    sm:flex
    mr-5
  "
>
  <ArrowLeft
    size={17}
  />

  Back to Home

</button>


            {/* Search */}

            <div
              className="
                relative
                flex-1
              "
            >

              <Search
                size={19}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />


              <input

                value={domainInput}

                onChange={(e) =>
                  setDomainInput(
                    e.target.value
                  )
                }

                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    addDomain();

                  }

                }}

                placeholder="
                  Enter a domain to generate SEO report
                  (e.g. nike.com)
                "

                className="
                  h-11
                  w-[450px]
                  rounded-lg
                  border
                  border-slate-200
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  focus:border-emerald-500
                "
              />

            </div>



            {/* Generate */}

            <button

              onClick={
                generateReport
              }

              className="
                hidden
                h-10
                items-center
                gap-2
                rounded-lg
                bg-[#07985f]
                px-5
                text-sm
                font-semibold
                text-white
                sm:flex
              "
            >

              Generate Report

              <ArrowRight
                size={17}
              />

            </button>


            {/* Mobile generate */}

            <button

              onClick={
                generateReport
              }

              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                bg-[#07985f]
                text-white
                sm:hidden
              "
            >

              <ArrowRight
                size={17}
              />

            </button>


            {/* Notification */}

            <button

              onClick={() =>
                notify(
                  "You have 1 new notification"
                )
              }

              className="
                relative
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                sm:flex
              "
            >

              <Bell
                size={20}
              />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-2
                  w-2
                  rounded-full
                  bg-red-500
                "
              />

            </button>


            {/* User */}

            <div
              className="
                hidden
                items-center
                gap-3
                md:flex
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#003b35]
                  font-bold
                  text-white
                "
              >
                U
              </div>


              <div
                className="
                  text-sm
                  leading-5
                "
              >

                <div>
                  Good Evening,
                </div>

                <strong>
                  Utsav 👋
                </strong>

              </div>

            </div>

          </div>

        </header>


        {/* ==============================================
            PAGE CONTENT
        =============================================== */}

        <section
          className="
            px-4
            py-5
            md:px-7
            md:py-6
          "
        >

          {/* Title */}

          <div
            className="
              mb-5
            "
          >

            <h1
              className="
                text-3xl
                font-extrabold
              "
            >
              SEO Reports
            </h1>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Generate detailed SEO reports
              for your website or competitors.
              Analyze, share, and track progress.
            </p>

          </div>


          {/* ============================================
              TWO COLUMN
          ============================================= */}

          <div
            className="
              grid
              gap-4
              xl:grid-cols-[0.83fr_1.17fr]
            "
          >

            {/* ==========================================
                CREATE REPORT
            =========================================== */}

            <section
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-panel
              "
            >

              {/* Heading */}

              <div
                className="
                  border-b
                  border-slate-100
                  pb-4
                "
              >

                <h2
                  className="
                    text-lg
                    font-bold
                  "
                >
                  Create Report
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Configure your report settings
                  and generate a comprehensive SEO report.
                </p>

              </div>


              {/* Domains */}

              <div
                className="
                  py-4
                "
              >

                <h3
                  className="
                    font-bold
                  "
                >
                  Domain(s) to Include
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Enter up to 5 domains to compare
                </p>


                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {domains.map(
                    (domain, index) => (

                      <span

                        key={domain}

                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-slate-200
                          px-3
                          py-2
                          text-sm
                        "
                      >

                        <span
                          className={`
                            h-3
                            w-3
                            rounded-full
                            ${
                              index === 0
                                ? "bg-blue-600"
                                : "bg-emerald-600"
                            }
                          `}
                        />


                        {domain}


                        <button
                          onClick={() =>
                            removeDomain(
                              domain
                            )
                          }
                        >

                          <X
                            size={15}
                          />

                        </button>

                      </span>

                    )
                  )}


                  {domains.length < 5 && (

                    <button

                      onClick={
                        addDomain
                      }

                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-slate-200
                        px-3
                        py-2
                        text-sm
                        text-slate-600
                        hover:bg-slate-50
                      "
                    >

                      <Plus
                        size={16}
                      />

                      Add competitor

                    </button>

                  )}

                </div>

              </div>


              {/* Date Range */}

              <div
                className="
                  border-t
                  border-slate-100
                  py-4
                "
              >

                <h3
                  className="
                    font-bold
                  "
                >
                  Date Range
                </h3>


                <div
                  className="
                    relative
                    mt-3
                  "
                >

                  <CalendarDays
                    size={18}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                    "
                  />


                  <select

                    value={
                      dateRange
                    }

                    onChange={(e) =>
                      setDateRange(
                        e.target.value
                      )
                    }

                    className="
                      h-11
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      pl-10
                      pr-10
                      text-sm
                    "
                  >

                    <option>
                      Apr 13, 2026 - Apr 13, 2026
                    </option>

                    <option>
                      Apr 01, 2026 - Apr 13, 2026
                    </option>

                    <option>
                      Mar 13, 2026 - Apr 13, 2026
                    </option>

                    <option>
                      Jan 01, 2026 - Apr 13, 2026
                    </option>

                  </select>


                  <ChevronDown
                    size={18}
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                    "
                  />

                </div>

              </div>


              {/* Schedule */}

              <div
                className="
                  border-t
                  border-slate-100
                  py-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div>

                    <h3
                      className="
                        font-bold
                      "
                    >
                      Schedule & Recipients

                      <span
                        className="
                          ml-1
                          font-normal
                          text-slate-400
                        "
                      >
                        (Optional)
                      </span>

                    </h3>


                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                      "
                    >
                      Configure automatic report delivery
                      and recipients
                    </p>

                  </div>


                  <button

                    onClick={() =>
                      setSchedule(
                        !schedule
                      )
                    }

                    className={`
                      relative
                      h-7
                      w-12
                      rounded-full
                      ${
                        schedule
                          ? "bg-emerald-600"
                          : "bg-slate-200"
                      }
                    `}
                  >

                    <span
                      className={`
                        absolute
                        top-1
                        h-5
                        w-5
                        rounded-full
                        bg-white
                        transition
                        ${
                          schedule
                            ? "left-6"
                            : "left-1"
                        }
                      `}
                    />

                  </button>

                </div>


                <button

                  onClick={() =>
                    setShowScheduleModal(
                      true
                    )
                  }

                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-blue-600
                  "
                >

                  <Plus
                    size={17}
                  />

                  Schedule report

                </button>

              </div>


              {/* White label */}

              <div
                className="
                  border-t
                  border-slate-100
                  py-4
                "
              >

                <h3
                  className="
                    font-bold
                  "
                >
                  White-label

                  <span
                    className="
                      ml-1
                      font-normal
                      text-slate-400
                    "
                  >
                    (Optional)
                  </span>

                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Use your logo in the report
                </p>


                <select

                  value={
                    whiteLabel
                  }

                  onChange={(e) =>
                    setWhiteLabel(
                      e.target.value
                    )
                  }

                  className="
                    mt-3
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    px-3
                    text-sm
                  "
                >

                  <option>
                    No logo
                  </option>

                  <option>
                    TN Nexora logo
                  </option>

                  <option>
                    Upload client logo
                  </option>

                </select>

              </div>


              {/* Report Format */}

              <div
                className="
                  border-t
                  border-slate-100
                  pt-4
                "
              >

                <h3
                  className="
                    font-bold
                  "
                >
                  Report Format
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Choose the output format
                </p>


                <div
                  className="
                    mt-4
                    grid
                    grid-cols-3
                    gap-3
                  "
                >

                  {[
                    {
                      name: "PDF",
                      icon: FileText,
                      desc:
                        "Portable, great for sharing and printing"
                    },

                    {
                      name: "CSV",
                      icon: FileBarChart2,
                      desc:
                        "Spreadsheet-compatible comma-separated values"
                    },

                    {
                      name: "HTML",
                      icon: Globe2,
                      desc:
                        "Web format with interactive viewing"
                    }
                  ].map(
                    item => {

                      const Icon =
                        item.icon;


                      return (

                        <button

                          key={
                            item.name
                          }

                          onClick={() =>
                            setFormat(
                              item.name
                            )
                          }

                          className={`
                            min-h-[105px]
                            rounded-lg
                            border
                            p-3
                            text-left

                            ${
                              format ===
                              item.name

                                ? "border-emerald-500 bg-[#f2fcf7]"

                                : "border-slate-200"
                            }
                          `}
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Icon
                              size={20}
                            />

                            <strong>
                              {item.name}
                            </strong>


                            {format ===
                              item.name && (

                              <span
                                className="
                                  ml-auto
                                  flex
                                  h-5
                                  w-5
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-emerald-600
                                  text-white
                                "
                              >

                                <Check
                                  size={13}
                                />

                              </span>

                            )}

                          </div>


                          <p
                            className="
                              mt-3
                              text-xs
                              leading-4
                              text-slate-500
                            "
                          >
                            {item.desc}
                          </p>

                        </button>

                      );

                    }
                  )}

                </div>


                {/* Generate */}

                <button

                  onClick={
                    generateReport
                  }

                  className="
                    mt-5
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#07985f]
                    text-sm
                    font-bold
                    text-white
                  "
                >

                  Generate Report

                  <ArrowRight
                    size={17}
                  />

                </button>

              </div>

            </section>


            {/* ==========================================
                REPORT PREVIEW
            =========================================== */}

            <section
              className="
                min-w-0
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-panel
              "
            >

              {/* Preview Header */}

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  border-b
                  border-slate-200
                  p-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    Report Preview
                  </h2>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    See a live preview of your SEO
                    report before downloading.
                  </p>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <button

                    onClick={
                      downloadReport
                    }

                    className="
                      flex
                      h-12
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      text-sm
                      font-semibold
                    "
                  >

                    <Download
                      size={25}
                    />

                    <span
                      className="
                        hidden
                        sm:inline
                      "
                    >
                      Download Report
                    </span>

                  </button>


                  <button

                    onClick={
                      sendReport
                    }

                    className="
                      flex
                      h-12
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      text-sm
                      font-semibold
                    "
                  >

                    <Send
                      size={25}
                    />

                    <span
                      className="
                        hidden
                        sm:inline
                      "
                    >
                      Send Report
                    </span>

                  </button>


                  <div
                    className="
                      relative
                    "
                  >

                    <button

                      onClick={() =>
                        setMenuOpen(
                          !menuOpen
                        )
                      }

                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                      "
                    >

                      <MoreHorizontal
                        size={19}
                      />

                    </button>


                    {menuOpen && (

                      <div
                        className="
                          absolute
                          right-0
                          top-12
                          z-10
                          w-44
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          p-2
                          shadow-xl
                        "
                      >

                        <button

                          onClick={() => {

                            setReportTitle(
                              "SEO Analysis Report"
                            );

                            setMenuOpen(
                              false
                            );

                            notify(
                              "Preview reset"
                            );

                          }}

                          className="
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-xs
                            hover:bg-slate-50
                          "
                        >
                          Reset Preview
                        </button>


                        <button

                          onClick={() => {

                            navigator
                              .clipboard
                              ?.writeText(
                                window.location.href
                              );

                            setMenuOpen(
                              false
                            );

                            notify(
                              "Preview link copied"
                            );

                          }}

                          className="
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-xs
                            hover:bg-slate-50
                          "
                        >
                          Copy Preview Link
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>


              {/* ========================================
                  REPORT CONTENT
              ========================================= */}

              <div
                ref={reportRef}
                className="
                  overflow-hidden
                  bg-white
                "
              >

                {/* Report top */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-slate-200
                    px-5
                    py-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        brand-mark
                        report-mark
                      "
                    >

                      <ArrowRight
                        size={22}
                      />

                    </div>


                    <div>

                      <div
                        className="
                          text-base
                          font-extrabold
                        "
                      >
                        TN SEO
                        <sup>®</sup>
                      </div>


                      <div
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        MODULE
                      </div>

                    </div>


                    <div
                      className="
                        hidden
                        h-8
                        w-px
                        bg-slate-200
                        sm:block
                      "
                    />


                    <div>

                      <div
                        className="
                          text-base
                          font-bold
                        "
                      >
                        {reportTitle}
                      </div>


                      <div
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        {domains[0]}
                        {" "}
                        vs
                        {" "}
                        {domains[1] ||
                          "1 competitor"}
                      </div>

                    </div>

                  </div>


                  <div
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Generated on Apr 13, 2026
                  </div>

                </div>


                {/* Report body */}

                <div
                  className="
                    p-5
                  "
                >

                  {/* Overview */}

                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-2
                      text-base
                      font-bold
                    "
                  >

                    Overview (All Keywords)

                    <Info
                      size={15}
                    />

                  </div>


                  {/* Metrics */}

                  <div
                    className="
                      grid
                      gap-3
                      md:grid-cols-3
                    "
                  >

                    {/* Average */}

                    <MetricCard
                      title="Average Position"
                    >

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            text-3xl
                            font-extrabold
                          "
                        >
                          {generated
                            ? "72.4"
                            : "86.9"}
                        </span>


                        <span
                          className="
                            text-lg
                            font-medium
                            text-emerald-600
                          "
                        >
                          ↑ 12%
                        </span>

                      </div>


                      <div
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        vs last period
                      </div>


                      <div
                        className="
                          mt-4
                          h-2
                          rounded-full
                          bg-slate-100
                        "
                      >

                        <div
                          className="
                            h-2
                            w-[28%]
                            rounded-full
                            bg-emerald-600
                          "
                        />

                      </div>


                      <div
                        className="
                          mt-1
                          flex
                          justify-between
                          text-[10px]
                          text-slate-400
                        "
                      >

                        <span>
                          100
                        </span>

                        <span>
                          1
                        </span>

                      </div>

                    </MetricCard>


                    {/* Distribution */}

                    <MetricCard
                      title="Keyword Distribution"
                    >

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <DonutChart />


                        <div
                          className="
                            space-y-2
                            text-xs
                          "
                        >

                          <Legend
                            color="bg-[#1684c8]"
                            text="Top 3 :"
                            value="164"
                          />

                          <Legend
                            color="bg-[#54a8d5]"
                            text="Top 10 :"
                            value="224"
                          />

                          <Legend
                            color="bg-[#9bcde7]"
                            text="Top 100 :"
                            value="190"
                          />

                        </div>

                      </div>

                    </MetricCard>


                    {/* Keyword Change */}

                    <MetricCard
                      title="Keyword Change"
                    >

                      <div
                        className="
                          mt-4
                          flex
                          justify-between
                        "
                      >

                        <span
                          className="
                            font-bold
                            text-emerald-600
                          "
                        >
                          ↑ {generated ? 14 : 0}
                        </span>


                        <span
                          className="
                            font-bold
                            text-red-500
                          "
                        >
                          ↓ 0
                        </span>

                      </div>


                      <div
                        className="
                          mt-3
                          h-2
                          rounded-full
                          bg-slate-100
                        "
                      />


                      <div
                        className="
                          mt-1
                          flex
                          justify-between
                          text-xs
                          text-slate-500
                        "
                      >

                        <span>
                          Went up
                        </span>

                        <span>
                          Went down
                        </span>

                      </div>

                    </MetricCard>

                  </div>


                  {/* Keywords */}

                  <div
                    className="
                      mt-6
                    "
                  >

                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        gap-2
                        font-bold
                      "
                    >

                      Keywords
                      (All Keywords)

                      <Info
                        size={15}
                      />

                    </div>


                    <div
                      className="
                        overflow-x-auto
                        rounded-lg
                        border
                        border-slate-100
                      "
                    >

                      <table
                        className="
                          min-w-[560px]
                          w-full
                          text-left
                          text-xs
                        "
                      >

                        <thead
                          className="
                            bg-slate-50
                            uppercase
                            text-slate-500
                          "
                        >

                          <tr>

                            <th className="px-3 py-3">
                              Domain
                            </th>

                            <th
                              className="
                                px-3
                                py-3
                                text-right
                              "
                            >
                              Indexed Pages
                            </th>

                          </tr>

                        </thead>


                        <tbody>

                          <tr
                            className="
                              border-t
                              border-slate-100
                            "
                          >

                            <td
                              className="
                                px-3
                                py-3
                                font-medium
                              "
                            >
                              {domains[0]}
                            </td>


                            <td
                              className="
                                px-3
                                py-3
                                text-right
                                font-medium
                              "
                            >
                              {generated
                                ? 526
                                : 448}
                            </td>

                          </tr>

                        </tbody>

                      </table>

                    </div>


                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      Report omitted.
                      Keyword limit for report reached.
                      Only the first 1000 keywords are shown.
                    </p>

                  </div>


                  {/* Top Rankings */}

                  <div
                    className="
                      mt-6
                    "
                  >

                    <div
                      className="
                        mb-2
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <h3
                        className="
                          font-bold
                        "
                      >
                        Top Keyword Rankings
                      </h3>


                    </div>


                    <div
                      className="
                        overflow-x-auto
                        rounded-lg
                        border
                        border-slate-100
                      "
                    >

                      <table
                        className="
                          min-w-[720px]
                          w-full
                          text-left
                          text-xs
                        "
                      >

                        <thead
                          className="
                            bg-slate-50
                            uppercase
                            text-slate-500
                          "
                        >

                          <tr>

                            <th className="px-3 py-3">
                              Keywords
                            </th>

                            <th className="px-3 py-3">
                              Rank
                            </th>

                            <th className="px-3 py-3">
                              Evolution
                            </th>

                            <th className="px-3 py-3">
                              Last Change
                            </th>

                            <th className="px-3 py-3">
                              D/M/M Change
                            </th>

                          </tr>

                        </thead>


                        <tbody>

                          {keywordData.map(
                            (item, index) => (

                              <KeywordRow
                                key={
                                  item.keyword
                                }

                                keyword={
                                  item.keyword
                                }

                                rank={
                                  item.rank
                                }

                                change={
                                  generated
                                    ? item.change +
                                      index
                                    : item.change
                                }

                                date={
                                  item.date
                                }

                              />

                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>

            </div>

              </div>

            </section>

          </div>

        </section>

      </main>


      {/* ================================================
          SCHEDULE MODAL
      ================================================= */}

      {showScheduleModal && (

        <div
          className="
            fixed
            inset-0
            z-[70]
            flex
            items-center
            justify-center
            bg-black/45
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-5
              shadow-2xl
            "
          >

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >

              <h3
                className="
                  text-lg
                  font-bold
                "
              >
                Schedule SEO Report
              </h3>


              <button

                onClick={() =>
                  setShowScheduleModal(
                    false
                  )
                }

                className="
                  rounded-lg
                  p-2
                  hover:bg-slate-100
                "
              >

                <X
                  size={19}
                />

              </button>

            </div>


            {/* Email */}

            <label
              className="
                block
                text-sm
                font-medium
              "
            >

              Recipient Email


              <input

                value={email}

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }

                type="email"

                className="
                  mt-2
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  outline-none
                  focus:border-emerald-500
                "
              />

            </label>


            {/* Frequency */}

            <label
              className="
                mt-4
                block
                text-sm
                font-medium
              "
            >

              Frequency


              <select

                value={frequency}

                onChange={(e) =>
                  setFrequency(
                    e.target.value
                  )
                }

                className="
                  mt-2
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                "
              >

                <option>
                  Daily
                </option>

                <option>
                  Weekly
                </option>

                <option>
                  Monthly
                </option>

              </select>

            </label>


            <button

              onClick={() => {

                setSchedule(
                  true
                );

                setShowScheduleModal(
                  false
                );

                notify(
                  `Report scheduled ${frequency.toLowerCase()}`
                );

              }}

              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-emerald-600
                py-3
                text-sm
                font-bold
                text-white
              "
            >

              Save Schedule

              <Check
                size={17}
              />

            </button>

          </div>

        </div>

      )}


      {/* ================================================
          TOAST
      ================================================= */}

      {toast && (

        <div
          className="
            fixed
            bottom-5
            right-5
            z-[80]
            flex
            items-center
            gap-3
            rounded-xl
            bg-slate-900
            px-4
            py-3
            text-sm
            font-medium
            text-white
            shadow-2xl
          "
        >

          <Check
            size={17}
            className="
              text-emerald-400
            "
          />

          {toast}

        </div>

      )}

    </div>

  );

}


/* =====================================================
   METRIC CARD
===================================================== */

function MetricCard({
  title,
  children
}) {

  return (

    <div
      className="
        rounded-lg
        border
        border-slate-100
        bg-white
        p-4
        shadow-sm
      "
    >

      <div
        className="
          text-sm
          font-semibold
        "
      >
        {title}
      </div>


      {children}

    </div>

  );

}


/* =====================================================
   DONUT CHART
===================================================== */

function DonutChart() {

  return (

    <div
      className="
        relative
        h-24
        w-96px
        shrink-0
        rounded
      "

      style={{
        background:
          "conic-gradient(#1684c8 0 38%, #54a8d5 38% 67%, #9bcde7 67% 100%)"
      }}
    >

      <div
        className="
          absolute
          inset-[17px]
          rounded-full
          bg-white
        "
      />

    </div>

  );

}


/* =====================================================
   LEGEND
===================================================== */

function Legend({
  color,
  text,
  value
}) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <span
        className={`
          h-3
          w-3
          rounded-full
          ${color}
        `}
      />


      <span>
        {text}
      </span>


      <strong>
        {value}
      </strong>

    </div>

  );

}


/* =====================================================
   KEYWORD ROW
===================================================== */

function KeywordRow({
  keyword,
  rank,
  change,
  date
}) {

  return (

    <tr
      className="
        border-t
        border-slate-100
      "
    >

      <td
        className="
          px-3
          py-2.5
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span>
            🇺🇸
          </span>


          <span
            className="
              font-medium
              underline
              decoration-slate-300
            "
          >
            {keyword}
          </span>

        </div>

      </td>


      <td
        className="
          px-3
          py-2.5
          font-semibold
        "
      >
        {rank}
      </td>


      <td
        className="
          px-3
          py-2.5
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <div className="sparkline">

            <i />
            <i />
            <i />
            <i />
            <i />
            <i />

          </div>


          <span
            className="
              font-semibold
              text-emerald-600
            "
          >
            ↑ {change}
          </span>

        </div>

      </td>


      <td
        className="
          px-3
          py-2.5
          text-slate-500
        "
      >
        {date}
      </td>


      <td
        className="
          px-3
          py-2.5
        "
      >

        <div
          className="
            flex
            gap-2
          "
        >

          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-slate-300
            "
          />

          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-emerald-200
            "
          />

          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-slate-300
            "
          />

        </div>

      </td>

    </tr>

  );

}


/* =====================================================
   DOWNLOAD HELPER
===================================================== */

function triggerDownload(
  blob,
  filename
) {

  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href = url;

  link.download =
    filename;


  link.click();


  setTimeout(
    () =>
      URL.revokeObjectURL(
        url
      ),
    1000
  );

}


