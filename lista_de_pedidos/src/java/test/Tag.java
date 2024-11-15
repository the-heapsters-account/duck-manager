import java.util.List;

public class Tag {
    private String fileName;
    private List<String> attributes;
    private List<String> values;

    public Tag(String fileName, List<String> attributesValuesTag, List<String> valuesAttributesTag, List<String> valuesTag) {
        this.fileName = fileName;
        this.attributes = attributes;
        this.values = values;
    }

    public String getFileName() {
        return this.fileName;
    }
    public List<String> getAttributes() {
        return this.attributes;
    }
    public List<String> getValues() {
        return this.values;
    }

    public void printDates() {
        System.out.println("file name: " + this.fileName);
        System.out.println("attributes: " + this.attributes);
        System.out.println("values: " + this.values);
    }
}