import java.util.List;

public class Tag {
    private String fileName;
    private List<String> attributesValuesTag;
    private List<String> valuesAttributesTag;
    private List<String> valuesTag;

    public Tag(String fileName, List<String> attributesValuesTag, List<String> valuesAttributesTag, List<String> valuesTag) {
        this.fileName = fileName;
        this.attributesValuesTag = attributesValuesTag;
        this.valuesAttributesTag = valuesAttributesTag;
        this.valuesTag = valuesTag;
    }

    public String getFileName() {
        return this.fileName;
    }
    public List<String> getAttributesValuesTag() {
        return this.attributesValuesTag;
    }
    public List<String> getValuesAttributesTag() {
        return this.valuesAttributesTag;
    }
    public List<String> getValuesTag() {
        return this.valuesTag;
    }

    public void printDates() {
        System.out.println("file name: " + this.fileName);
        System.out.println("attributes values: " + this.attributesValuesTag);
        System.out.println("values attributes: " + this.valuesAttributesTag);
        System.out.println("values tag: " + this.valuesTag);
    }
}