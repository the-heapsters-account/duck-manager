package com.plugin.createDocs.createTxt;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

public class CreateTxt {
    private String fileName;

    public CreateTxt(String fileName) {
        this.fileName = fileName;
    }

    public void createFile() throws Exception {
        File file = new File(fileName);

        if(file.exists()) {
            throw new Exception("O arquivo já existe: " + fileName);
        } else if(!file.createNewFile()) {
            throw new Exception("Não foi possível criar o arquivo: " + fileName);
        }
    }

    public void addLine(String line) {
        try(BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
            writer.write(line);
            writer.newLine();
        } catch(IOException e) {
            System.err.println("Erro ao escrever no arquivo: " + e.getMessage());
        }
    }

    public List<String> readFile() {
        List<String> lines = new ArrayList<>();
        try {
            lines = Files.readAllLines(Paths.get(fileName));
        } catch(IOException e) {
            System.err.println("Erro ao ler o arquivo: " + e.getMessage());
        }
        return lines;
    }
}