package se.corneliapersson.itc.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.corneliapersson.itc.dto.GarmentDTO;
import se.corneliapersson.itc.dto.Response;
import se.corneliapersson.itc.entity.Garment;
import se.corneliapersson.itc.service.GarmentService;

import javax.swing.*;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class GarmentController {

    private final GarmentService garmentService;

    public GarmentController(GarmentService garmentService) {
        this.garmentService = garmentService;
    }

    @GetMapping(path = "api/garments")
    public List<GarmentDTO> getAllGarments(){
        return garmentService.getAllGarments();
    }

    @PostMapping(path = "/api/garment")
    public Response addGarment(@RequestBody GarmentDTO garmentDTO) {
        Garment garment = garmentService.addGarment(garmentDTO);
        System.out.println(garment);
        return new Response("OK", String.valueOf(garment.getId()));
    }

    @PostMapping(path = "/api/garment/picture/{id}")
    public Response addPicture(@RequestParam("name") MultipartFile multipartFile, @PathVariable("id") Long id) {
        return garmentService.saveImage(id, multipartFile);
    }

    @GetMapping(path = "api/garment/picture/{id}")
    public byte[] getPicture(@PathVariable Long id) throws IOException {
        return garmentService.getImage(id);
    }
}
