export async function GET() {
  return Response.json({
    status: "ok",
    service: "leadflow",
    timestamp: new Date().toISOString(),
  });
}
