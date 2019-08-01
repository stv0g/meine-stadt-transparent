from django.core.management.base import BaseCommand

from mainapp.functions.citytools import import_streets
from mainapp.models import Body


class Command(BaseCommand):
    help = "Imports streets from OpenStreetMap for a given city"

    def add_arguments(self, parser):
        parser.add_argument("ags", type=str, help="The Amtliche Gemeindeschlüssel")
        parser.add_argument("body-id", type=int)

    def handle(self, *args, **options):
        body = Body.objects.get(id=options["body-id"])

        import_streets(body, options["ags"])
