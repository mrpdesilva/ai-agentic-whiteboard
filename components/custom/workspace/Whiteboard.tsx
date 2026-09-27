import React, { useRef, useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/toast';
import './whiteboard.css';
import { ArrowRight, Circle, Diamond, Eraser, Hand, Icon, Image, Minus, MousePointer2, Pencil, Square, Type } from 'lucide-react';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types';

const tools = [
    {
        name: "selection",
        icon: MousePointer2,
        color: "text-blue-500"
    },
    {
        name: "hand",
        icon: Hand,
        color: "text-cyan-500"
    },
    {
        name: "rectangle",
        icon: Square,
        color: "text-blue-500"
    },
    {
        name: "diamond",
        icon: Diamond,
        color: "text-emerald-500"
    },
    {
        name: "ellipse",
        icon: Circle,
        color: "text-amber-500"
    },
    {
        name: "arrow",
        icon: ArrowRight,
        color: "text-violet-500"
    },
    {
        name: "line",
        icon: Minus,
        color: "text-pink-500"
    },
    {
        name: "freedraw",
        icon: Pencil,
        color: "text-orange-500"
    },
    {
        name: "text",
        icon: Type,
        color: "text-indigo-500"
    },
    {
        name: "image",
        icon: Image,
        color: "text-green-500"
    },
    {
        name: "eraser",
        icon: Eraser,
        color: "text-red-500"
    },
]

function Whiteboard() {

    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

    const saveTimeRef = useRef<any>(null);

    const { projectid } = useParams();

    const [activeTool, setActiveTool] = useState("selection");

    const handleCanvasChange = (elements: readonly any[], appState: any, files: any) => {
        if (appState?.activeTool?.type && appState.activeTool.type !== activeTool) {
            setActiveTool(appState.activeTool.type);
        }

        //Cancel prev Timer
        if (saveTimeRef?.current) {
            clearTimeout(saveTimeRef.current);
        }

        // Start New 10 second timer
        saveTimeRef.current = setTimeout(() => {
            // saveCanvasChanges(elements, appState, files);
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

    const changeTool = (tool: any) => {
        if (!excalidrawAPI) return;

        setActiveTool(tool);
        excalidrawAPI.setActiveTool({
            type: tool
        });
    }

    return (
        <div className='w-full h-full relative'>
            <Excalidraw
                //@ts-ignore
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                onChange={handleCanvasChange}
            />

            <div className='absolute left-4 top-1/2 z-50 -translate-y-1/2
            flex flex-col  rounded-2xl bg-white border p-1.5 shadow-xl'>
                {tools.map((tool) => {
                    const Icon = tool.icon;

                    return (
                        <button
                            key={tool.name}
                            title={tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}
                            className={`flex h-9 w-9 items-center justify-center rounded-xl transition
                            hover:bg-primary/10 hover:cursor-pointer
                            ${activeTool == tool.name ? "bg-primary/10 ring-1 ring-primary/30" : ""}`}
                            onClick={() => changeTool(tool.name)}
                        >
                            <Icon size="18" className={tool.color} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Whiteboard
