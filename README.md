# Stellar — GitHub Star Map

Explore Parth Chandak's GitHub repos as a 3D star constellation. Each repo is a star — older repos shine larger, programming languages color them, recent activity makes them pulse.

**Visual Style:** Dark — Void (adapted for celestial). Deep space black with blue-white accent stars.

**Data Source:** GitHub REST API (`api.github.com/users/parthchandak02/repos`)

**How it works:**
- Data field `created_at` controls star size (older repos = larger stars)
- Data field `language` controls star color (mapped to recognizable language colors)
- Data field `pushed_at` controls star pulse speed (recently pushed = faster pulse)
- Tap/click a star to reveal a detail panel with repo name, creation date, last push, and description
- Same-language repos connect by faint constellation lines
- Auto-rotate to explore, or orbit manually

**GitHub:** https://github.com/parthchandak02/stellar

**Live:** https://stellar.parthchandak.info

**Tech:** React Three Fiber + drei. Hosted on Cloudflare Pages.
