function getDuration(createdAt: string) {
  const start = new Date(createdAt).getTime();
  const now = Date.now();
  const diff = Math.floor((now - start) / 1000 / 60);
  return `${diff} minutes`;
}

export default function SessionInfo({ session }: { session: any }) {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <h2 className="font-medium">Session Information</h2>

      <p className="text-sm">
        Logged in for{' '}
        <span className="font-semibold">{getDuration(session?.createdAt)}</span>
      </p>

      <p className="text-sm text-muted-foreground">
        Device: {session?.userAgent?.split(')')[0]})
      </p>

      <p className="text-sm text-muted-foreground">
        Logged out after {new Date(session?.expiresAt).toLocaleString()}
      </p>
    </div>
  );
}
