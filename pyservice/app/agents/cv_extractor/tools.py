import json
import os

def get_agent_instruction() -> str:
    cv_format_path = os.path.join(os.path.dirname(__file__), 'cv_formatter.json')
    with open(cv_format_path, 'r') as file:
        cv_format = json.load(file)

    return f"""
        You are an extraction agent.

        Your task is to extract structured information from a plain-text CV or resume and convert it into a well-formed JSON format.

        ### Instructions:
        1. Carefully read the plain text CV input.
        2. Identify and extract the following fields:
        - personal_information (list of entries with (full_name, email, phone, address, linkedin, website, github, profile_summary))
        - career_objective (string)
        - work_experience (list of entries with (job_title, company, location, start_date, end_date, is_current, responsibilities, achievements))
        - education (list of entries with (degree, field, institution, location, start_date, end_date, grade))
        - skills (list of categories with (name, skills))
        - certifications (optional, list of entries with (name, issuing_organization, issue_date))
        - projects (list of entries with (name, description, start_date, end_date))
        - languages (list of entries with (language, level))
        - volunteering (list of entries with (organization, position, start_date, end_date, description))
        - awards (list of entries with (name, organization, year))
        - publications (list of entries with (title, publisher, year))
        - interests (list of entries with (name, description))
        - references (list of entries with (name, relationship, email))
        
        3. Return the result as valid JSON only. Do not include any explanation or extra text.


    --- CV JSON Format ---
       {json.dumps(cv_format, indent=2)}
    """