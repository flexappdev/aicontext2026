# TikTok Skill

Manage TikTok integration — fetch liked videos, convert to markdown, upload content, and check status.

## Subcommands

### `/tiktok liked`
Fetch liked videos from TikTok via TikAPI.io.

**Steps:**
1. Call `GET /api/tiktok/liked` to fetch paginated liked videos
2. Display video cards with description, author, stats, and hashtags
3. Support pagination via cursor parameter

### `/tiktok convert <videoId>`
Convert a single TikTok video to a structured markdown page.

**Steps:**
1. Call `POST /api/tiktok/convert` with the video data and orgId
2. The API generates a markdown template with metadata, stats, and content recreation notes
3. Upserts the video record and saves the markdown content
4. Sets conversion_status to "done"

### `/tiktok convert-all`
Bulk convert all fetched liked videos to markdown.

**Steps:**
1. Fetch liked videos if not already loaded
2. Iterate through all videos and call convert for each
3. Report progress and any failures

### `/tiktok upload <file> --title --desc --hashtags`
Upload a video to TikTok with metadata.

**Steps:**
1. Validate file exists and title is provided
2. Build FormData with video file, title, description, and hashtags
3. Call `POST /api/tiktok/upload` to proxy to TikAPI.io
4. Return publish ID on success

### `/tiktok status`
Check TikAPI connectivity and database stats.

**Steps:**
1. Call `GET /api/tiktok/status?orgId=<orgId>`
2. Display connection status (connected/disconnected)
3. Show account info if connected (username, followers, video count)
4. Show database stats (total, converted, pending, failed)

### `/tiktok sync`
Full sync: fetch all liked videos and batch upsert to database.

**Steps:**
1. Fetch all pages of liked videos using cursor pagination
2. Call `batchUpsertTikTokVideos` server action with all results
3. Report total synced count

## Environment
- Requires `TIKTOK_COOKIE` — your TikTok session cookie (export via Cookie-Editor browser extension)
- Requires `TIKTOK_USERNAME` — your TikTok username
- Uses `@tobyg74/tiktok-api-dl` npm package (free, open-source)
- Data stored in `tiktok_videos` table with org-scoped RLS
- All operations require authenticated user with org membership

## API Endpoints
- `GET /api/tiktok/liked?limit=` — Fetch liked videos
- `POST /api/tiktok/convert` — Convert video to markdown
- `POST /api/tiktok/upload` — Save video draft to Supabase storage
- `GET /api/tiktok/status?orgId=` — Check connection + stats
