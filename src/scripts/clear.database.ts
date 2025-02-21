import { db } from "@/database";
import { sql } from "drizzle-orm";

import { confirmDeletion } from "@/scripts/utils";

async function init() {
  const warnText = "Database";

  try {
    const confirmed = await confirmDeletion(
      `WARNING: This will delete ALL ${warnText} data.`,
    );
    if (!confirmed) {
      console.error("❌ Operation cancelled.");
      return;
    }

    const tablesSchema = db._.schema;
    if (!tablesSchema)
      throw new Error("Schema not loaded");

    await db.run(sql.raw(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`));

    await db.run(sql.raw(`DROP SCHEMA public CASCADE;`));
    await db.run(sql.raw(`CREATE SCHEMA public;`));
    await db.run(sql.raw(`GRANT ALL ON SCHEMA public TO postgres;`));
    await db.run(sql.raw(`GRANT ALL ON SCHEMA public TO public;`));
    await db.run(
      sql.raw(`COMMENT ON SCHEMA public IS 'standard public schema';`),
    );

    console.error(`✅ All ${warnText} data deleted successfully!`);
  }
  catch (error) {
    console.error(`❌ Error deleting ${warnText} data:`, error);
  }
  finally {
    process.exit(0);
  }
}

init();
