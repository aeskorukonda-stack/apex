/* mobile-layout-fix.js */
(function () {
  // 1. Inject pure mobile layout fixes and bottom bar styling
  const style = document.createElement("style");
  style.id = "apex-mobile-responsive-rules";
  style.textContent = `
    @media (max-width: 768px) {
      /* Universal container & overflow safety */
      *, *::before, *::after {
        box-sizing: border-box !important;
        max-width: 100% !important;
      }

      html, body {
        width: 100% !important;
        overflow-x: hidden !important;
        position: relative;
      }

      /* Fix horizontal overflow & text breaks */
      p, li, span, h1, h2, h3, h4, b, strong {
        word-break: break-word !important;
        overflow-wrap: break-word !important;
        text-align: left !important;
        text-justify: auto !important;
      }

      /* Header normalization */
      header {
        padding: 10px 14px !important;
      }
      .header-wrap {
        width: 100% !important;
      }
      .brand-group {
        gap: 8px !important;
      }
      .header-logo {
        width: 36px !important;
        height: 36px !important;
      }
      .brand-text h1 {
        font-size: 16px !important;
      }
      .nav-links-desktop {
        display: none !important;
      }
      .mobile-menu-toggle {
        display: block !important;
      }

      /* Content padding & alignment */
      main,
      .about-container,
      .profile-container,
      .enquiries-container,
      .donate-container,
      .feedback-container,
      .hub-container {
        padding-left: 12px !important;
        padding-right: 12px !important;
        margin-top: 14px !important;
        width: 100% !important;
      }

      /* Prevent cards & form elements from spilling outside the screen */
      .hero-banner,
      .pillar-card,
      .info-box,
      .profile-card,
      .enquiries-card,
      .donate-card,
      .feedback-card,
      .browse-tool-card,
      .tutor-card,
      .hub-card,
      .auth-portal-card,
      .cards-grid {
        width: 100% !important;
        padding: 16px 14px !important;
        border-radius: 14px !important;
      }

      .cards-grid {
        grid-template-columns: 1fr !important;
      }

      .filters-row-grid,
      .form-grid-2,
      .edit-grid-2 {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;
        width: 100% !important;
      }

      .btn-filter-search {
        width: 100% !important;
        justify-content: center !important;
      }

      /* Table responsive transformation (Profile table) */
      .details-table,
      .details-table tbody,
      .details-table tr,
      .details-table td {
        display: block !important;
        width: 100% !important;
      }
      .details-table tr {
        padding: 8px 0 !important;
      }
      .details-table td:first-child {
        font-size: 11px !important;
        color: #64748B !important;
        padding-bottom: 2px !important;
      }
      .details-table td:last-child {
        font-size: 13.5px !important;
      }

      /* Prevent footer from getting blocked by bottom buttons */
      body.has-mobile-dock {
        padding-bottom: 85px !important;
      }

      /* Bottom 3-Button Dock (Matches Screenshot) */
      .apex-mobile-dock {
        display: grid !important;
        grid-template-columns: 1.15fr 1fr 1fr !important;
        gap: 8px !important;
        position: fixed !important;
        bottom: 10px !important;
        left: 10px !important;
        right: 10px !important;
        background: #FFFFFF !important;
        padding: 8px !important;
        border-radius: 16px !important;
        border: 1.5px solid #CBD5E1 !important;
        box-shadow: 0 8px 24px rgba(10, 25, 47, 0.18) !important;
        z-index: 99999 !important;
        align-items: center !important;
      }

      .dock-item-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        padding: 10px 4px !important;
        border-radius: 10px !important;
        text-decoration: none !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        line-height: 1.2 !important;
        text-align: center !important;
        border: 1.5px solid #CBD5E1 !important;
        background: #FFFFFF !important;
        color: #0A192F !important;
        position: relative !important;
      }

      /* Active screen button (Navy background from screenshot) */
      .dock-item-btn.active-tab {
        background: #0A192F !important;
        color: #FFFFFF !important;
        border-color: #0A192F !important;
      }
      .dock-item-btn.active-tab i {
        color: #FFFFFF !important;
      }

      .dock-label-stack {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
      }

      .dock-unread-badge {
        position: absolute !important;
        top: -5px !important;
        right: -4px !important;
        background: #EF4444 !important;
        color: #FFFFFF !important;
        font-size: 9.5px !important;
        font-weight: 800 !important;
        border-radius: 10px !important;
        padding: 1px 5px !important;
        line-height: 1.2 !important;
      }
    }

    /* Completely hidden on desktop */
    @media (min-width: 769px) {
      .apex-mobile-dock {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Render and manage bottom buttons across all pages
  async function setupMobileDock() {
    if (document.getElementById("apexMobileDockNav")) return;

    const path = window.location.pathname.toLowerCase();
    const isEnquiries = path.includes("enquiries");
    const isProfile = path.includes("profile");
    const isBrowse = path.includes("browse");

    // Dynamic role check (Default: Teachers)
    let browseTarget = "Teachers";
    const cachedProfile = localStorage.getItem("apex_profile_cache");
    const cachedRole = localStorage.getItem("apex_role_cache");

    if (cachedRole === "teacher") {
      browseTarget = "Students";
    }

    const dock = document.createElement("nav");
    dock.id = "apexMobileDockNav";
    dock.className = "apex-mobile-dock";
    dock.innerHTML = `
      <a href="enquiries.html" class="dock-item-btn ${isEnquiries ? 'active-tab' : ''}">
        <i class="fa-solid fa-clipboard-list" style="${isEnquiries ? '' : 'color:#0A192F;'}"></i>
        <span>Enquiries</span>
        <span class="dock-unread-badge" id="dockLiveBadge" style="display:none;">0</span>
      </a>

      <a href="profile.html" class="dock-item-btn ${isProfile ? 'active-tab' : ''}">
        <i class="fa-solid fa-user" style="${isProfile ? '' : 'color:#6366F1;'}"></i>
        <div class="dock-label-stack">
          <span>View My</span>
          <span>Profile</span>
        </div>
      </a>

      <a href="browse.html" class="dock-item-btn ${isBrowse ? 'active-tab' : ''}">
        <i class="fa-solid fa-magnifying-glass" style="${isBrowse ? '' : 'color:#0284C7;'}"></i>
        <div class="dock-label-stack">
          <span>Browse</span>
          <span id="dockBrowseLabel">${browseTarget}</span>
        </div>
      </a>
    `;

    document.body.appendChild(dock);
    document.body.classList.add("has-mobile-dock");

    // Check Supabase session for live unread badge and accurate role
    if (window.supabase) {
      try {
        const client = window.db || window.supabase.createClient(
          "https://agxoxrtetmcfwbpzyypo.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFneG94cnRldG1jZndicHp5eXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMjg2MDIsImV4cCI6MjEwMjcwNDYwMn0.ASD3Sv83YCdwQURKYsuORWgBnSj37vXlz7EIEMFC3u0"
        );

        const { data: { session } } = await client.auth.getSession();
        if (session && session.user) {
          const { data: t } = await client.from("teachers").select("id").eq("id", session.user.id).maybeSingle();
          const labelEl = document.getElementById("dockBrowseLabel");
          if (labelEl) {
            labelEl.textContent = t ? "Students" : "Teachers";
          }

          const { data: enq } = await client
            .from("enquiries")
            .select("id")
            .eq("recipient_id", session.user.id)
            .eq("status", "Pending");

          if (enq && enq.length > 0) {
            const badge = document.getElementById("dockLiveBadge");
            if (badge) {
              badge.textContent = enq.length;
              badge.style.display = "inline-block";
            }
          }
        }
      } catch (err) {
        console.warn("Mobile dock sync:", err);
      }
    }
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", setupMobileDock);
  } else {
    setupMobileDock();
  }
})();