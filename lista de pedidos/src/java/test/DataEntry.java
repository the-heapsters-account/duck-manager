public class DataEntry {
    private String[] values;

    public DataEntry(String[] values) {
        this.values = values;
    }

    @Override
    public String toString() {
        return String.join(", ", this.values);
    }
}