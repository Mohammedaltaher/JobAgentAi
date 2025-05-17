from jinja2 import Environment, FileSystemLoader
import json
import pdfkit  # or use WeasyPrint if preferred
from app.logger_config import logger


async def generate_cv(template_type: str = "classic"):
    """
    Generate a CV using the specified template type.
    
    Args:
        template_type (str): The type of template to use (e.g., 'classic', 'modren', 'test').
        
    Returns:
        dict: A message indicating whether the CV was generated successfully.
    """
    template_type = template_type.lower()
    with open(f"app/generate_cv/templates/{template_type}/cv_data.json") as f:
        data = json.load(f)
    env = Environment(
        loader=FileSystemLoader(f"app/generate_cv/templates/{template_type}")
    )
    template = env.get_template("cv_template.html")  # template
    html_out = template.render(**data)  # Render HTML with data
    print("html_out", html_out)
    with open("app/generate_cv/cv_output.html", "w") as f:
        f.write(html_out)  # Save the rendered HTML

    # Convert HTML to PDF (using wkhtmltopdf / pdfkit)
    pdfkit.from_file('app/generate_cv/cv_output.html', 'app/generate_cv/cv_output.pdf')

    logger.info(f"CV generated successfully using {template_type} template")
    return {"message": "CV generated successfully"}

