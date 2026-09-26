/* mobile-layout-fix.js */
(function () {
  // 1. Inject pure mobile layout fixes and bottom bar styling
  const style = document.createElement("style");
  style.id = "apex-mobile-responsive-rules";
  style.textContent = `
    /* These rules are intentionally scoped to mobile screens only.
       Desktop styles are not changed. */
    @media (max-width: 768px) {
      :root {
        --apex-mobile-gutter: 14px;
        --apex-mobile-control-height: 44px;
      }

      html {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        -webkit-text-size-adjust: 100%;
      }

      body {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow-x: hidden;
        padding-bottom: 88px !important;
      }

      /* Prevent accidental horizontal scrolling without forcing every
         element to be narrower than its intended layout. */
      img, svg, video, canvas, iframe {
        max-width: 100%;
      }

      .header-wrap,
      main,
      footer,
      .about-container,
      .profile-container,
      .enquiries-container,
      .donate-container,
      .feedback-container,
      .hub-container {
        min-width: 0 !important;
      }

      header {
        padding: 10px var(--apex-mobile-gutter) !important;
      }

      .header-wrap {
        width: 100% !important;
        gap: 10px !important;
      }

      .brand-group {
        min-width: 0 !important;
        gap: 8px !important;
      }

      .header-logo {
        width: 36px !important;
        height: 36px !important;
        flex: 0 0 36px !important;
      }

      .brand-text {
        min-width: 0 !important;
      }

      .brand-text h1 {
        font-size: 15px !important;
        line-height: 1.15 !important;
        white-space: nowrap !important;
      }

      .nav-links-desktop {
        display: none !important;
      }

      .mobile-menu-toggle {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex: 0 0 42px !important;
        width: 42px !important;
        min-width: 42px !important;
        height: 42px !important;
        min-height: 42px !important;
        border-radius: 10px !important;
        touch-action: manipulation;
      }

      .mobile-drawer {
        max-height: calc(100dvh - 72px) !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
      }

      main,
      .about-container,
      .profile-container,
      .enquiries-container,
      .donate-container,
      .feedback-container,
      .hub-container {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: var(--apex-mobile-gutter) !important;
        padding-right: var(--apex-mobile-gutter) !important;
        margin-top: 16px !important;
      }

      .hero-container,
      .content-grid,
      .cards-grid,
      .footer-grid,
      .filters-row-grid,
      .form-grid-2,
      .edit-grid-2,
      .panel-role-actions {
        min-width: 0 !important;
      }

      .cards-grid {
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 12px !important;
      }

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
      .auth-portal-card {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        padding: 16px !important;
        border-radius: 14px !important;
      }

      .filters-row-grid,
      .form-grid-2,
      .edit-grid-2 {
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 12px !important;
        width: 100% !important;
      }

      .filters-row-grid > *,
      .form-grid-2 > *,
      .edit-grid-2 > * {
        width: 100% !important;
        min-width: 0 !important;
      }

      input:not([type="checkbox"]):not([type="radio"]),
      select,
      textarea,
      button,
      .btn,
      .btn-filter-search,
      .btn-action-chat {
        min-height: var(--apex-mobile-control-height);
        max-width: 100%;
      }

      input:not([type="checkbox"]):not([type="radio"]),
      select,
      textarea {
        font-size: 16px !important; /* Prevents iOS zoom on focus. */
      }

      button,
      a,
      input,
      select,
      textarea {
        touch-action: manipulation;
      }

      .btn-filter-search,
      .btn-action-chat,
      .wizard-nav-btns button,
      .edit-form-btns button {
        width: 100% !important;
        justify-content: center !important;
      }

      /* Long text and links should wrap rather than widen the page. */
      p, li, span, h1, h2, h3, h4, h5, h6, a, td, th, label {
        overflow-wrap: anywhere;
      }

      p {
        text-align: left !important;
        text-justify: auto !important;
      }

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
        word-break: break-word !important;
      }

      .table-responsive,
      .scroll-x,
      .admin-table-wrap {
        max-width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
      }

      /* Existing dock and the dock generated by this file share one
         consistent, safe-area-aware mobile treatment. */
      .mobile-bottom-dock,
      .apex-mobile-dock {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 8px !important;
        position: fixed !important;
        left: max(10px, env(safe-area-inset-left)) !important;
        right: max(10px, env(safe-area-inset-right)) !important;
        bottom: max(10px, env(safe-area-inset-bottom)) !important;
        width: auto !important;
        padding: 8px !important;
        border-radius: 16px !important;
        border: 1px solid #CBD5E1 !important;
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 8px 24px rgba(10, 25, 47, 0.18) !important;
        z-index: 99999 !important;
        align-items: stretch !important;
      }

      .dock-btn,
      .dock-item-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        min-width: 0 !important;
        min-height: 44px !important;
        padding: 8px 4px !important;
        border-radius: 10px !important;
        text-decoration: none !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        line-height: 1.2 !important;
        text-align: center !important;
        border: 1px solid #CBD5E1 !important;
        background: #FFFFFF !important;
        color: #0A192F !important;
        position: relative !important;
      }

      .dock-btn.dock-btn-primary,
      .dock-item-btn.active-tab {
        background: #0A192F !important;
        color: #FFFFFF !important;
        border-color: #0A192F !important;
      }

      .dock-btn.dock-btn-primary i,
      .dock-item-btn.active-tab i {
        color: #FFFFFF !important;
      }

      .dock-btn-label-stacked,
      .dock-label-stack {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        min-width: 0 !important;
      }

      .dock-badge,
      .dock-unread-badge {
        position: absolute !important;
        top: -5px !important;
        right: -4px !important;
        background: #EF4444 !important;
        color: #FFFFFF !important;
        font-size: 9.5px !important;
        font-weight: 800 !important;
        border-radius: 10px !important;
        padding: 2px 5px !important;
        line-height: 1.2 !important;
      }
    }

    @media (max-width: 380px) {
      .brand-text h1 {
        font-size: 13px !important;
      }

      .mobile-bottom-dock,
      .apex-mobile-dock {
        gap: 5px !important;
        padding: 6px !important;
      }

      .dock-btn,
      .dock-item-btn {
        gap: 3px !important;
        font-size: 10px !important;
        padding-left: 2px !important;
        padding-right: 2px !important;
      }
    }

    @media (min-width: 769px) {
      .apex-mobile-dock {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Render and manage bottom buttons across all pages
  async function setupMobileDock() {
    if (document.getElementById("apexMobileDockNav") || document.getElementById("mobileBottomDock")) {
      document.body.classList.add("has-mobile-dock");
      return;
    }

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