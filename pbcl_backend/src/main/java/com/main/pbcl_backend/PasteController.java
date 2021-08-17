package com.main.pbcl_backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

class Conector {
    static Connection getCon() throws Exception {
        final String url = "jdbc:postgresql://localhost/pbcldb";
        var props = new Properties();
        props.setProperty("user", "postgres");
        props.setProperty("password", "postgres_password");
        props.setProperty("ssl", "allow");
        Connection con = DriverManager.getConnection(url, props);
        return con;
    }
}

@RestController
public class PasteController {
    private static final String ORIGIN = "http://localhost:3000/";
    private final AtomicLong counter = new AtomicLong();

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        System.out.println("WORKS!");
        return "OK!";
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/update/{id}", produces = "application/json", method = RequestMethod.PUT)
    public ResponseEntity<Void> updatePaste(@RequestBody Paste paste, @PathVariable long id) throws Exception {
        var query = "UPDATE pastes " +
                    "SET name=?, " +
                    "    content=? " +
                    "WHERE id=%d;";
        query = String.format(query, id);
        var con = Conector.getCon();
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, paste.getName());
        ps.setString(2, paste.getContent());
        ps.execute();//*/
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delPaste(@PathVariable final long id) throws Exception {
        final var query = String.format("DELETE FROM pastes WHERE id=%d", id);
        Statement stmt = Conector.getCon().createStatement();
        stmt.execute(query);
        return new ResponseEntity<>(HttpStatus.OK);
    }//*/

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<Void> createPaste(@RequestBody final Paste paste) throws Exception {
        var con = Conector.getCon();
        final var query = "INSERT INTO pastes(name, content) VALUES(?, ?);";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, paste.getName());
        ps.setString(2, paste.getContent());
        ps.execute();//*/
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/paste/{id}", method = RequestMethod.GET)
    public Paste getPaste(@PathVariable final long id) throws Exception {
        Connection con = Conector.getCon();
        final String query = String.format("SELECT * FROM pastes WHERE id = %d;", id);
        ResultSet rs = con.createStatement().executeQuery(query);
        boolean hasNext = rs.next();
        assert hasNext;
        var paste = new Paste(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("content")
        );//*/
        return paste;
    }

    @CrossOrigin(origins = ORIGIN)
    @RequestMapping(value = "/pastes", method = RequestMethod.GET)
    public ArrayList<Paste> getPastes() throws Exception {
        var pastes = new ArrayList<Paste>();
        try {
            Statement stmt = Conector.getCon().createStatement();
            final String query = "SELECT * FROM pastes";
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                final var paste = new Paste(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("content")
                );
                pastes.add(paste);
            }
        } catch (Exception e) {
            System.out.printf("error: %s", e.getMessage());
        }//*/
        return pastes;
    }
}
