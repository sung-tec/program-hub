$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 4173
while (Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue) {
  $Port += 1
}

$Prefix = "http://127.0.0.1:$Port/"
$Listener = [System.Net.HttpListener]::new()
$Listener.Prefixes.Add($Prefix)
$Listener.Start()

Start-Process $Prefix
Write-Host "수학별 모험단이 실행 중입니다: $Prefix"
Write-Host "이 창을 닫으면 게임 서버가 종료됩니다."

$MimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".js" = "text/javascript; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg" = "image/svg+xml"
  ".webp" = "image/webp"
  ".avif" = "image/avif"
  ".ico" = "image/x-icon"
}

try {
  while ($Listener.IsListening) {
    $Context = $Listener.GetContext()
    $RequestPath = [System.Uri]::UnescapeDataString($Context.Request.Url.AbsolutePath.TrimStart("/"))
    if ([string]::IsNullOrWhiteSpace($RequestPath)) {
      $RequestPath = "index.html"
    }

    $Candidate = Join-Path $Root $RequestPath
    $FullPath = [System.IO.Path]::GetFullPath($Candidate)
    $RootFull = [System.IO.Path]::GetFullPath($Root)

    if (-not $FullPath.StartsWith($RootFull)) {
      $Context.Response.StatusCode = 403
      $Context.Response.Close()
      continue
    }

    if (-not (Test-Path -LiteralPath $FullPath -PathType Leaf)) {
      $FullPath = Join-Path $Root "index.html"
    }

    $Bytes = [System.IO.File]::ReadAllBytes($FullPath)
    $Extension = [System.IO.Path]::GetExtension($FullPath).ToLowerInvariant()
    $Context.Response.ContentType = if ($MimeTypes.ContainsKey($Extension)) { $MimeTypes[$Extension] } else { "application/octet-stream" }
    $Context.Response.ContentLength64 = $Bytes.Length
    $Context.Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    $Context.Response.OutputStream.Close()
  }
}
finally {
  $Listener.Stop()
}
