import { db, whiteBoardData } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { projectId, elements, files, appState } = await req.json();
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
    }

    if (!projectId) {
        return NextResponse.json({ error: "Project information is missing" }, { status: 400 });
    }

    try {
        const result = await db.insert(whiteBoardData).values({
            projectId: projectId,
            elements: elements,
            files: files,
            appState: appState
        }).onConflictDoUpdate({
            target: whiteBoardData.projectId,
            set: {
                elements: elements,
                files: files,
                appState: appState,
                updatedAt: new Date()
            }
        })

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Whiteboard save error:", error);
        return NextResponse.json({ error: error?.message ?? "Failed to save" }, { status: 500 });
    }
}