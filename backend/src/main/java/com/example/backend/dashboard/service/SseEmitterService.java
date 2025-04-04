package com.example.backend.dashboard.service;

import com.example.backend.dashboard.dto.CaseDetectResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@Service
public class SseEmitterService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter createEmitter() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);

        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            System.out.println("[SseEmitterService] Emitter completed. Current count = " + emitters.size());
        });

        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            System.out.println("[SseEmitterService] Emitter timed out. Current count = " + emitters.size());
        });

        emitter.onError((e) -> {
            emitters.remove(emitter);
            System.out.println("[SseEmitterService] Emitter error: " + e.getMessage());
        });

        try {
            emitter.send(SseEmitter.event().name("connect").data("SSE connection established!"));
            System.out.println("[SseEmitterService] Sent initial 'connect' event.");
        } catch (IOException e) {
            emitters.remove(emitter);
            System.out.println("[SseEmitterService] Failed to send initial event: " + e.getMessage());
        }

        return emitter;
    }

    public void broadcast(CaseDetectResponse response) {
        List<SseEmitter> deadEmitters = new ArrayList<>();

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("alarm-detected")
                        .data(response, MediaType.APPLICATION_JSON)
                );
                System.out.println("  -> [alarm-detected] sent to " + emitter);
            } catch (IOException e) {
                deadEmitters.add(emitter);
                System.out.println("  -> Failed to send to Emitter: " + emitter);
            }
        }
        emitters.removeAll(deadEmitters);
    }

}
