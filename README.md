# A simple express api for serving notes

To get it working, you will have to load up the scheme:
`psql <existing_database> < schema.sql`

Replace the `<existing_database>` with a `postgres` or another one that already exists. That loads up the schema. It creates a `notebook` database a `notes` table, where the notes are stored.

You would have to modify the content of `db.js` as well a little bit. Change the `user` to your own account name
