package com.plugin.createDocs.createTxt;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class CreateTxt {
    private String fileName;

    public CreateTxt(String fileName) {
        this.fileName = fileName;
    }

    public void createFile() throws Exception {
        try {
            File file = new File(fileName);

            if(!file.createNewFile()) throw new Exception("O arquivo " + fileName + " já existe");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void addLine(String line) {
        try(BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
            writer.write(line);
            writer.newLine();
            System.out.println("Linha adicionada ao documento.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> readFile() {
        try {
            List<String> lines = Files.readAllLines(Paths.get(fileName));

            return lines;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}