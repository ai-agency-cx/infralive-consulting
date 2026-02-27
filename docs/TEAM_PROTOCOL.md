# Team Protocol - Documentation Standards

## Documentation Requirements for All Team Members

### @architect Responsibilities
1. **Create in `/docs/architecture/`:**
   - System design documents
   - Database schema diagrams
   - API specifications
   - Infrastructure diagrams
   - Technology selection justifications

2. **File Naming Convention:**
   - `ARCHITECTURE_[TOPIC].md` (e.g., `ARCHITECTURE_DATABASE.md`)
   - Include date and version in header
   - Use Mermaid diagrams when possible

### @dev Responsibilities
1. **Create in `/docs/development/`:**
   - Feature specifications
   - API endpoint documentation
   - Code style guidelines
   - Development setup guides
   - Third-party integration docs

2. **File Naming Convention:**
   - `DEV_[FEATURE].md` (e.g., `DEV_AUTHENTICATION.md`)
   - Include code examples and test cases
   - Document any assumptions or constraints

### @qa Responsibilities
1. **Create in `/docs/testing/`:**
   - Test plans and strategies
   - Security audit reports
   - Performance test results
   - Browser/device compatibility matrix
   - Bug tracking procedures

2. **File Naming Convention:**
   - `QA_[AREA].md` (e.g., `QA_SECURITY_AUDIT.md`)
   - Include test cases and expected results
   - Document testing environment details

### @pm Responsibilities
1. **Create in `/docs/project/`:**
   - Project timelines and milestones
   - Meeting notes and decisions
   - Stakeholder communications
   - Resource allocation
   - Risk assessment documents

2. **File Naming Convention:**
   - `PM_[TOPIC].md` (e.g., `PM_SPRINT_PLAN.md`)
   - Include dates and responsible parties
   - Track action items and deadlines

## Documentation Standards
1. **All documents must include:**
   - Creation date and last updated timestamp
   - Author name/role
   - Version number (if applicable)
   - Status (Draft, Review, Approved, Archived)

2. **Formatting:**
   - Use Markdown for all documentation
   - Include table of contents for documents > 500 words
   - Use clear headings and subheadings
   - Add diagrams/images where helpful

3. **Review Process:**
   - Documents start as `DRAFT`
   - Team review required before `APPROVED`
   - CEO can review any document at any time
   - Archived documents moved to `/docs/archive/`

## File Structure Template
```
/docs/
├── PROJECT_OVERVIEW.md          # @pm
├── TEAM_PROTOCOL.md             # @pm
├── architecture/                # @architect
│   ├── ARCHITECTURE_DECISIONS.md
│   ├── SYSTEM_DESIGN.md
│   └── DATABASE_SCHEMA.md
├── development/                 # @dev
│   ├── API_SPECIFICATION.md
│   ├── CODE_STYLE_GUIDE.md
│   └── SETUP_GUIDE.md
├── testing/                     # @qa
│   ├── TEST_PLAN.md
│   ├── SECURITY_CHECKLIST.md
│   └── PERFORMANCE_REQUIREMENTS.md
├── project/                     # @pm
│   ├── TIMELINE.md
│   ├── MEETING_NOTES/
│   └── RISK_REGISTER.md
└── archive/                     # All
    └── [dated folders]
```

## Update Frequency
- **Daily:** Project status updates in `PROJECT_OVERVIEW.md`
- **Weekly:** Architecture/development progress documents
- **Per Feature:** New documentation for each major feature
- **As Needed:** Meeting notes, decisions, changes

## Access & Permissions
- All team members can create/edit documents in their respective areas
- Cross-review encouraged for important decisions
- CEO has read access to all documents
- Document history maintained via Git

---
*Established: 2026-02-27 by @pm*