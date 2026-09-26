import React, { useRef, useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/toast';

function Whiteboard() {

    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    const saveTimeRef = useRef<any>(null);

    const { projectid } = useParams();

    const handleCanvasChange = (elements: readonly any[], appState: any, files: any) => {
        //Cancel prev Timer
        if (saveTimeRef?.current) {
            clearTimeout(saveTimeRef.current);
        }

        // Start New 10 second timer
        saveTimeRef.current = setTimeout(() => {
            saveCanvasChanges(elements, appState, files);
        }, 10000)
    }

    const saveCanvasChanges = async (elements: readonly any[], appState: any, files: any) => {
        // Strip non-serializable fields from appState (e.g. collaborators is a Map in Excalidraw v0.18+)
        const { collaborators, ...serializableAppState } = appState ?? {};

        try {
            await axios.post("/api/whiteboard", {
                elements: elements,
                appState: serializableAppState,
                files: files ?? {},
                projectId: projectid
            });

            toast.add({
                title: "Changes Saved",
                type: "success"
            });
        } catch (error) {
            console.error("Failed to save whiteboard:", error);
            toast.add({
                title: "Failed to save changes",
                type: "error"
            });
        }
    }

    return (
        <div>
            <div style={{ height: "90vh" }}>
                <Excalidraw
                    //@ts-ignore
                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                    onChange={handleCanvasChange}
                />
            </div>
        </div>
    )
}

export default Whiteboard
