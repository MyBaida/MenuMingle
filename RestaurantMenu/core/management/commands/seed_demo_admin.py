"""Create/refresh a demo admin account so visitors can explore the admin panel.

Idempotent: safe to re-run; it always (re)sets the known demo password and the
staff/superuser flags. Intended for development/demo environments only — the
credentials are shown on the admin login screen for testing.

Usage:
    python manage.py seed_demo_admin
"""

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

DEMO_EMAIL = "admin@served.com"
DEMO_PASSWORD = "served123"


class Command(BaseCommand):
    help = "Create (or refresh) the demo admin account used for testing."

    def handle(self, *args, **options):
        user, created = User.objects.get_or_create(
            username=DEMO_EMAIL,
            defaults={
                "email": DEMO_EMAIL,
                "first_name": "Demo",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        user.email = DEMO_EMAIL
        user.is_staff = True
        user.is_superuser = True
        user.set_password(DEMO_PASSWORD)
        user.save()

        action = "Created" if created else "Refreshed"
        self.stdout.write(
            self.style.SUCCESS(f"{action} demo admin: {DEMO_EMAIL} / {DEMO_PASSWORD}")
        )
