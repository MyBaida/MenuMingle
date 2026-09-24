"""Seed realistic categories and menu items for the Served demo.

Idempotent: uses ``get_or_create`` so re-running preserves any existing data
(edits made through the admin are never overwritten). Images reuse the assets
already present in ``static/images`` so tiles render without new uploads.

Usage:
    python manage.py seed_menu
"""

from django.core.management.base import BaseCommand

from core.models import Category, MenuItem

# Each category carries a default image (a file that already exists in
# static/images, served by Django at /images/<filename>). Individual items may
# override it below where a closer photo is available.
CATEGORIES = [
    {"name": "Starters", "image": "chicken.jpeg"},
    {"name": "Main Course", "image": "chicken.jpeg"},
    {"name": "Burgers", "image": "burger.jpg"},
    {"name": "Pizza", "image": "placeholder.png"},
    {"name": "Salads", "image": "salad.png"},
    {"name": "Brunch", "image": "Sandwich.jpeg"},
    {"name": "Desserts", "image": "frapuccino-cookies-and-cream.png"},
    {"name": "Ice Cream", "image": "frapuccino-cookies-and-cream.png"},
    {"name": "Drinks", "image": "red-tea.png"},
    {"name": "Coffee", "image": "frapuccino-cookies-and-cream.png"},
]

# cooking_duration stores a bare number (the UI renders "<value> mins").
# Prices are in GH₵. "image" is optional and overrides the category default.
ITEMS = [
    # Starters
    {"name": "Crispy Chicken Wings", "category": "Starters", "price": "45.00", "duration": "15",
     "description": "Golden-fried wings tossed in a spicy honey glaze."},
    {"name": "Vegetable Spring Rolls", "category": "Starters", "price": "30.00", "duration": "12",
     "description": "Crispy rolls served with a sweet chilli dip."},
    {"name": "Grilled Chicken Skewers", "category": "Starters", "price": "50.00", "duration": "18",
     "description": "Marinated skewers with a smoky barbecue sauce."},
    {"name": "Garlic Bread", "category": "Starters", "price": "25.00", "duration": "10",
     "description": "Toasted bread with buttery garlic and herbs."},

    # Main Course
    {"name": "Jollof Rice & Chicken", "category": "Main Course", "price": "65.00", "duration": "25",
     "description": "Smoky party jollof served with grilled chicken."},
    {"name": "Banku & Grilled Tilapia", "category": "Main Course", "price": "70.00", "duration": "25",
     "description": "Fermented corn dough with peppered grilled tilapia."},
    {"name": "Waakye Special", "category": "Main Course", "price": "60.00", "duration": "20",
     "description": "Rice and beans with shito, egg, wele and gari."},
    {"name": "Beef Stew & Rice", "category": "Main Course", "price": "55.00", "duration": "22",
     "description": "Slow-cooked beef stew with steamed jasmine rice."},

    # Burgers
    {"name": "Classic Beef Burger", "category": "Burgers", "price": "55.00", "duration": "15",
     "description": "Juicy beef patty with lettuce, tomato and cheese."},
    {"name": "Spicy Chicken Burger", "category": "Burgers", "price": "50.00", "duration": "15",
     "description": "Crispy chicken fillet with chipotle mayo."},
    {"name": "Double Stack Burger", "category": "Burgers", "price": "75.00", "duration": "18",
     "description": "Two beef patties, double cheese and house sauce."},
    {"name": "Garden Veggie Burger", "category": "Burgers", "price": "45.00", "duration": "14",
     "description": "Grilled plant-based patty with fresh slaw."},

    # Pizza
    {"name": "Margherita Pizza", "category": "Pizza", "price": "70.00", "duration": "20",
     "description": "Tomato base, mozzarella and fresh basil."},
    {"name": "Pepperoni Pizza", "category": "Pizza", "price": "85.00", "duration": "20",
     "description": "Classic pepperoni with melted mozzarella."},
    {"name": "BBQ Chicken Pizza", "category": "Pizza", "price": "90.00", "duration": "22",
     "description": "Barbecue chicken, red onion and coriander."},
    {"name": "Veggie Supreme Pizza", "category": "Pizza", "price": "80.00", "duration": "22",
     "description": "Peppers, mushrooms, olives and red onion."},

    # Salads
    {"name": "Garden Salad", "category": "Salads", "price": "35.00", "duration": "8",
     "description": "Crisp greens, tomato, cucumber and vinaigrette."},
    {"name": "Caesar Salad", "category": "Salads", "price": "45.00", "duration": "10",
     "description": "Romaine, parmesan, croutons and Caesar dressing."},
    {"name": "Greek Salad", "category": "Salads", "price": "42.00", "duration": "8",
     "description": "Feta, olives, cucumber, tomato and oregano."},
    {"name": "Avocado Salad", "category": "Salads", "price": "48.00", "duration": "8",
     "description": "Fresh avocado, cherry tomato and lime dressing.", "image": "salad-2.png"},

    # Brunch
    {"name": "Club Sandwich", "category": "Brunch", "price": "50.00", "duration": "15",
     "description": "Triple-decker with chicken, egg and slaw."},
    {"name": "Avocado Toast", "category": "Brunch", "price": "42.00", "duration": "12",
     "description": "Sourdough, smashed avocado and a poached egg.", "image": "salad-2.png"},
    {"name": "Pancake Stack", "category": "Brunch", "price": "40.00", "duration": "14",
     "description": "Fluffy pancakes with syrup and fresh berries.",
     "image": "frapuccino-cookies-and-cream.png"},
    {"name": "Cheese Omelette & Toast", "category": "Brunch", "price": "38.00", "duration": "12",
     "description": "Three-egg omelette with cheese and buttered toast."},

    # Desserts
    {"name": "Chocolate Lava Cake", "category": "Desserts", "price": "45.00", "duration": "15",
     "description": "Warm chocolate cake with a molten centre."},
    {"name": "Vanilla Cheesecake", "category": "Desserts", "price": "42.00", "duration": "10",
     "description": "Creamy cheesecake with a mixed berry sauce."},
    {"name": "Fresh Fruit Platter", "category": "Desserts", "price": "35.00", "duration": "8",
     "description": "A seasonal selection of fresh fruit.", "image": "salad.png"},

    # Ice Cream
    {"name": "Vanilla Ice Cream", "category": "Ice Cream", "price": "25.00", "duration": "5",
     "description": "Classic vanilla bean scoop."},
    {"name": "Chocolate Sundae", "category": "Ice Cream", "price": "32.00", "duration": "6",
     "description": "Chocolate ice cream with fudge and roasted nuts."},
    {"name": "Cookies & Cream Scoop", "category": "Ice Cream", "price": "30.00", "duration": "5",
     "description": "Cookies and cream scoop with biscuit crumb."},

    # Drinks
    {"name": "Fresh Lemonade", "category": "Drinks", "price": "20.00", "duration": "5",
     "description": "Zesty homemade lemonade with mint."},
    {"name": "Iced Red Tea", "category": "Drinks", "price": "18.00", "duration": "5",
     "description": "Chilled hibiscus tea with a hint of ginger."},
    {"name": "Fruit Smoothie", "category": "Drinks", "price": "28.00", "duration": "6",
     "description": "Blended seasonal fruit with yoghurt."},
    {"name": "Sparkling Water", "category": "Drinks", "price": "12.00", "duration": "2",
     "description": "Chilled sparkling mineral water."},

    # Coffee
    {"name": "Cappuccino", "category": "Coffee", "price": "25.00", "duration": "6",
     "description": "Espresso with steamed milk and velvety foam."},
    {"name": "Caffè Latte", "category": "Coffee", "price": "26.00", "duration": "6",
     "description": "Smooth espresso with silky steamed milk."},
    {"name": "Iced Frappuccino", "category": "Coffee", "price": "32.00", "duration": "7",
     "description": "Blended iced coffee topped with cream."},
    {"name": "Espresso", "category": "Coffee", "price": "20.00", "duration": "4",
     "description": "Rich single-shot espresso."},
]


class Command(BaseCommand):
    help = "Seed the menu with realistic categories and items (idempotent)."

    def handle(self, *args, **options):
        # Default image per category, used when an item has no explicit image.
        category_images = {c["name"]: c["image"] for c in CATEGORIES}
        categories = {}
        created_cats = 0

        for entry in CATEGORIES:
            category, created = Category.objects.get_or_create(name=entry["name"])
            categories[entry["name"]] = category
            if created:
                created_cats += 1

        self.stdout.write(
            f"Categories: {created_cats} created, "
            f"{len(CATEGORIES) - created_cats} already present."
        )

        created_items = 0
        for item in ITEMS:
            category = categories[item["category"]]
            image = item.get("image") or category_images[item["category"]]
            _, created = MenuItem.objects.get_or_create(
                name=item["name"],
                defaults={
                    "category": category,
                    "price": item["price"],
                    "description": item["description"],
                    "cooking_duration": item["duration"],
                    "image": image,
                },
            )
            if created:
                created_items += 1

        self.stdout.write(
            f"Menu items: {created_items} created, "
            f"{len(ITEMS) - created_items} already present."
        )
        self.stdout.write(self.style.SUCCESS("seed_menu complete."))
