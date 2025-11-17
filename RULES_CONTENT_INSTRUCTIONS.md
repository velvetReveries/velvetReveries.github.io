# Instructions for Updating Rules Content

The `rules.html` page has been created with a structured layout and placeholder content based on general roleplay server rules. To complete the implementation, you need to update it with the actual content from https://glyphrp.com/ark-rules/

## How to Update the Content

1. **Visit the source page**: Go to https://glyphrp.com/ark-rules/

2. **Identify all rule sections**: The page has sub-sections accessible via tabs:
   - General rules (https://glyphrp.com/ark-rules/#tab-1-1-general-277)
   - Discord rules (https://glyphrp.com/ark-rules/#tab-1-2-discord-58)
   - And any other sub-sections visible in the left sidebar

3. **Copy content for each section**: For each tab/section:
   - Copy all the rule text, sub-headings, and descriptions
   - Note the structure (headings, paragraphs, lists)

4. **Update rules.html**: Replace the placeholder content in each `<section class="rules-section">` with the actual content:
   - Replace `<h3>` headings with the actual rule names
   - Replace `<p>` paragraphs with the actual rule descriptions
   - Add `<ul>` or `<ol>` lists if the rules use bullet points or numbered lists
   - Add new sections if there are more rule categories than currently included

## Section Structure

Each rule section follows this structure:

```html
<section class="rules-section" id="section-name">
    <h2 class="rules-heading">Section Title</h2>
    <div class="rules-content">
        <h3>Sub-section or Rule Name</h3>
        <p>Rule description text goes here.</p>
        
        <!-- For lists, use: -->
        <ul>
            <li>List item 1</li>
            <li>List item 2</li>
        </ul>
        
        <!-- Or for numbered lists: -->
        <ol>
            <li>First rule</li>
            <li>Second rule</li>
        </ol>
    </div>
</section>
```

## Current Placeholder Sections

The following sections are currently included with placeholder content:
- General Rules
- Discord Rules
- Character Creation
- Combat & PvP Rules
- Building Rules

**Add or remove sections as needed** based on the actual content from the source site.

## Styling Notes

- All styling is already configured in `styles.css`
- The page has good spacing and readability built-in
- Sections have a purple left border for visual distinction
- The page is fully responsive for mobile devices
- No additional styling should be needed unless you want to customize colors/spacing

## Testing

After updating the content:
1. Open `rules.html` in a browser
2. Verify all content is readable and properly formatted
3. Check on mobile view (resize browser window)
4. Ensure all sections have adequate spacing
5. Verify the navbar link works from other pages
