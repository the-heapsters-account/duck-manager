package com.plugin.tools.readDoc;

import java.util.List;
import java.util.ArrayList;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadText {
    public List<String> getLines() {
        try(BufferedReader br = new BufferedReader(new FileReader("extras/args.txt"))) {
            String line;
            List<String> lines = new ArrayList<>();

            while((line = br.readLine()) != null) lines.add(line);

            return lines;
        } catch(IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}