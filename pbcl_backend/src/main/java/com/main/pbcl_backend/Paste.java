package com.main.pbcl_backend;

public class Paste {
    private static final short MAX_NAME_LEN = 30;
    private long id;
    private String name;
    private String content;
    public Paste() {
        //just for testing
    }
    public Paste(long id, String name, String content) {
        if (id <= 0 || name.length() == 0 || content.length() == 0 || name.length() > MAX_NAME_LEN) {
            throw new IllegalArgumentException();
        }
        this.id = id;
        this.name = name;
        this.content = content;
    }
    public long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getContent() {
        return content;
    }
    @Override
    public String toString() {
        return String.format("id:%d-name:%s-content:%s", id, name, content);
    }
}
