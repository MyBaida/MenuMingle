"""One-shot bootstrap for ephemeral/free-tier hosts (e.g. Render's free plan).

Free tiers give you a non-persistent disk, so the SQLite database is wiped on
every cold start / redeploy. This command rebuilds a working demo state from
scratch. Every step is idempotent, so it is safe to run on EVERY boot (it never
overwrites edits made through the admin panel).

Order of operations:
    1. ``migrate --noinput``            -> create/upgrade all tables.
    2. seed the demo tables (AB6/CH1/VQ3 with stable ids 1/2/3, so ``/table/1``
       and existing QR codes always resolve).
    3. ``seed_menu``                     -> categories + menu items.
    4. ``seed_demo_admin``               -> admin@served.com / served123.

Usage:
    python manage.py bootstrap

Typical production start command (see render.yaml):
    python manage.py bootstrap && gunicorn RestaurantMenu.wsgi:application
"""

from django.core.management import call_command
from django.core.management.base import BaseCommand

from core.models import Table

# (id, name) pairs recreated on a fresh database. Explicit ids keep QR codes and
# the demo link (/table/1 -> AB6) stable across cold starts.
DEMO_TABLES = [
    (1, "AB6"),
    (2, "CH1"),
    (3, "VQ3"),
]


class Command(BaseCommand):
    help = "Migrate + seed the database so a fresh (ephemeral) instance boots ready to demo."

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("Bootstrapping database..."))

        # 1. Schema.
        call_command("migrate", "--noinput")

        # 2. Demo tables with stable ids (non-destructive: existing rows win).
        for table_id, name in DEMO_TABLES:
            table, created = Table.objects.get_or_create(
                _id=table_id, defaults={"name": name}
            )
            if created:
                self.stdout.write(f"  + created table #{table._id} ({name})")

        # 3. Menu categories + items.
        call_command("seed_menu")

        # 4. Demo admin account.
        call_command("seed_demo_admin")

        self.stdout.write(self.style.SUCCESS("Bootstrap complete."))
