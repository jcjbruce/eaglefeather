# EagleFeather.ca — Project TODO

## Design System & Setup
- [x] Configure global CSS with EagleFeather color palette (deep teal, warm amber, off-white)
- [x] Add Google Fonts (Playfair Display + Inter)
- [x] Create shared layout components (Navbar, Footer, CrisisBanner)

## Database Schema
- [x] resources table (id, name, description, url, phone, email, categoryId, provinces, whoItServes, lastVerified, lastChecked, linkStatus, isPublished, submittedBy)
- [x] categories table (id, slug, name, color, icon)
- [x] link_reports table (id, resourceId, reporterEmail, comment, createdAt, status)
- [x] submissions table (id, name, url, category, province, contactInfo, comment, status, createdAt)
- [x] Push schema to database

## Seed Data
- [x] Seed 8 categories with colors and icons
- [x] Seed 23 verified national resources with full metadata

## Backend Routers
- [x] resources router (list, getById, getByCategory, getByProvince, search, submit, reportLink)
- [x] admin router (listAll, create, update, delete, verify, listReports, listSubmissions, approveSubmission, linkHealth)
- [x] linkChecker router / admin-triggered job with HTTP status recording

## Public Pages
- [x] Home page (crisis banner, category cards, province filter, search, land acknowledgement)
- [x] Browse by Category page (category pills, resource cards, filters)
- [x] Browse by Province/Territory page (jurisdiction list, filtered resources)
- [x] Resource Detail page (full info, contact, flag button)
- [x] Crisis Support page (large phone numbers, 988/Hope for Wellness/KUU-US)
- [x] About & Acknowledgement page (scope, editorial standards, land acknowledgement)
- [x] Submit a Resource form page

## Admin Panel
- [x] Admin panel with tab navigation (Resources / Submissions / Link Health)
- [x] Resource management (list, add, edit, delete, verify, publish/unpublish)
- [x] Link health dashboard (broken links stats, user reports queue)
- [x] Submissions queue (review, approve, reject)
- [x] Manual link check trigger with owner notification

## Link Checking System
- [x] Admin-triggered URL ping job (checks all published resources with URLs)
- [x] Flag broken links in database (HTTP status recorded)
- [x] Admin notification on broken links found

## Tests
- [x] auth.me and auth.logout tests
- [x] Resources router tests (list, reportLink, submit validation)
- [x] Admin access control tests (UNAUTHORIZED, FORBIDDEN, admin allowed)
- [x] 16 tests total, all passing

## v1.1 — Resource Expansion & Fixes
- [x] Research and compile 100+ Indigenous health resources across all provinces/territories
- [x] Add province-specific resources for each of the 13 jurisdictions (not just national)
- [x] Add allied organizations (Kids Help Phone, CMHA, CAMH, Jack.org, We Matter, Mental Health Commission of Canada)
- [x] Add Friendship Centres by region
- [x] Add youth-focused resources (Indigenous and allied)
- [x] Fix Browse by Region to show distinct province-specific resources (not all the same)
- [x] Improve the EagleFeather logo
- [x] Seed the expanded database with all new resources
- [x] Verify all resources are properly tagged by province and category

## v1.2 — Province Filter Fix
- [x] Fix backend: when filtering by a specific province, exclude resources tagged only as "National"
- [x] Fix frontend: remove the "National Resources (Available Everywhere)" section from province views
- [x] Update province sidebar counts to show only province-specific resource counts

## v1.3 — UX Overhaul & Admin Tools
- [x] Redesign logo with First Nations cultural elements (eagle feather, medicine wheel colors, etc.)
- [x] Merge Browse by Topic + Browse by Region into one unified directory page
- [x] Dynamic province counts that update per selected topic (so users see counts before clicking)
- [x] Ensure no empty results — counts show 0 so users know before clicking
- [x] Add admin CSV/Excel export of all resources with URLs, statuses, verification dates
- [x] Document the submission workflow (how submitted resources flow through backend to published)
- [x] Update navigation to reflect merged browse page

## v1.4 — Maternal Category Fix
- [x] Reorder Maternal, Infant & Child resources so FASD is NOT first/primary
- [x] Add more positive maternal health resources (midwifery, prenatal, child health) to lead the category
- [x] Ensure FASD resources are further down the list, not prominently positioned
