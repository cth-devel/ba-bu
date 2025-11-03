"""
Knowledge Base Service
Loads and formats BaBu knowledge base files for system instruction
"""
import os
from pathlib import Path
from typing import Dict

# Base path for knowledge base files
KB_BASE_PATH = Path(__file__).parent.parent / "resources" / "knowledge-base"


def load_knowledge_base_file(filename: str) -> str:
    """Load a single knowledge base markdown file."""
    try:
        file_path = KB_BASE_PATH / filename
        if file_path.exists():
            return file_path.read_text(encoding="utf-8")
        else:
            print(f"Warning: Knowledge base file {filename} not found")
            return ""
    except Exception as e:
        print(f"Error loading knowledge base file {filename}: {e}")
        return ""


def load_all_knowledge_base() -> Dict[str, str]:
    """Load all knowledge base files."""
    return {
        "index": load_knowledge_base_file("INDEX.md"),
        "salonInfo": load_knowledge_base_file("01-salon-information.md"),
        "contactLocations": load_knowledge_base_file("02-contact-locations.md"),
        "servicesOverview": load_knowledge_base_file("03-services-overview.md"),
        "hairCare": load_knowledge_base_file("04-hair-care-services.md"),
        "skinBodyCare": load_knowledge_base_file("05-skin-body-care.md"),
        "bridalServices": load_knowledge_base_file("06-bridal-services.md"),
        "mensGrooming": load_knowledge_base_file("07-mens-grooming.md"),
        "pricingGuide": load_knowledge_base_file("08-pricing-guide.md"),
        "bookingProcess": load_knowledge_base_file("09-booking-process.md"),
        "faq": load_knowledge_base_file("10-faq.md"),
    }


def create_system_instruction() -> str:
    """
    Create comprehensive system instruction for Gemini Live API.
    This includes all BaBu knowledge base information.
    """
    kb = load_all_knowledge_base()

    instruction = f"""You are a helpful voice assistant for BA-BU Family Salon, a premium family salon located in North Paravur, Ernakulam, Kerala, India.

**YOUR PURPOSE**:
You help customers by:
1. Providing information about BA-BU Family Salon services, pricing, and locations
2. Helping customers book appointments
3. Answering questions about salon services, working hours, and contact information
4. Guiding customers through service options

**CRITICAL RULES**:
1. ONLY provide information about BA-BU Family Salon
2. If asked about other salons or unrelated topics, politely redirect: "I can only help you with information about BA-BU Family Salon. Would you like to know about our services?"
3. Always use information from the knowledge base provided below
4. Be friendly, professional, and helpful
5. Speak naturally and conversationally
6. For booking inquiries, collect: customer name, preferred date, preferred time, and service needed
7. When discussing pricing, be clear and specific

**KNOWLEDGE BASE STRUCTURE**:
All information about BA-BU Family Salon is organized in the knowledge base below. Use this information to answer questions accurately.

{kb['index']}

**SALON INFORMATION**:
{kb['salonInfo']}

**CONTACT & LOCATIONS**:
{kb['contactLocations']}

**SERVICES OVERVIEW**:
{kb['servicesOverview']}

**HAIR CARE SERVICES**:
{kb['hairCare']}

**SKIN & BODY CARE SERVICES**:
{kb['skinBodyCare']}

**BRIDAL SERVICES**:
{kb['bridalServices']}

**MEN'S GROOMING SERVICES**:
{kb['mensGrooming']}

**PRICING GUIDE**:
{kb['pricingGuide']}

**BOOKING PROCESS**:
{kb['bookingProcess']}

**FAQ**:
{kb['faq']}

**BOOKING INSTRUCTIONS**:
When a customer wants to book:
1. Confirm the service name and pricing
2. Ask for preferred date and time
3. Ask for customer name
4. Provide the booking information:
   - Phone: +919846272333
   - WhatsApp: https://wa.me/919846272333
   - Tell them they will receive confirmation via WhatsApp or phone call

**IMPORTANT NOTES**:
- Prices are in Indian Rupees (₹)
- Always confirm pricing when providing service information
- Mention working hours when relevant
- Guide customers to the appropriate branch if they ask about location-specific services

**RESPONSE STYLE**:
- Be warm and welcoming
- Speak naturally as if talking to a friend
- Keep responses concise but informative
- Ask clarifying questions if needed
- Use the customer's name if provided during booking

Remember: Your ONLY purpose is to help customers with BA-BU Family Salon information and booking. Stay focused on this goal."""
    
    return instruction


# Cache system instruction in memory
from typing import Optional
_system_instruction_cache: Optional[str] = None


def get_system_instruction() -> str:
    """Get system instruction (cached)."""
    global _system_instruction_cache
    if _system_instruction_cache is None:
        _system_instruction_cache = create_system_instruction()
    return _system_instruction_cache

