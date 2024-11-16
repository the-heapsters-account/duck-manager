import java.util.List;

public class Tag {
    private List<String> attributesNames;
    private List<String> attributesValues;
    private List<String> tagNames;
    private List<String> tagValues;

    public Tag(List<String> attributesNames, List<String> attributesValues, List<String> tagNames, List<String> tagValues) {
        this.attributesNames = attributesNames;
        this.attributesValues = attributesValues;
        this.tagNames = tagNames;
        this.tagValues = tagValues;
    }

    // getters
    public List<String> getAttributesNames() {
        return this.attributesNames;
    }
    public List<String> getAttributesValues() {
        return this.attributesValues;
    }
    public List<String> getTagNames() {
        return this.tagNames;
    }
    public List<String> getTagValues() {
        return this.tagValues;
    }

    // output
    public void printDates() {
        System.out.println("attributes: " + this.attributesNames);
        System.out.println("attributes values: " + this.attributesValues);
        System.out.println("tag names: " + this.tagNames);
        System.out.println("tag values: " + this.tagValues);
    }
}