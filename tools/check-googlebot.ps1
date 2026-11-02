# Checks both pages the way Googlebot asks for them.
# Run in PowerShell:   .\tools\check-googlebot.ps1      (or paste the whole thing)

$urls = @(
  "https://www.pkdascollegeofphysiotherapy.com/",
  "https://www.pkdascollegeofphysiotherapy.com/application-form-2026/"
)

$agents = [ordered]@{
  "Googlebot smartphone" = "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  "Googlebot desktop"    = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  "Normal browser"       = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

foreach ($url in $urls) {
  Write-Host ""
  Write-Host "=== $url" -ForegroundColor Cyan

  # 1) status code, redirects and final address for each user agent
  foreach ($name in $agents.Keys) {
    $r = curl.exe -s -o NUL -L -A $agents[$name] -w "HTTP %{http_code} | redirects: %{num_redirects} | final: %{url_effective} | %{time_total}s" $url
    Write-Host ("{0,-22} {1}" -f $name, $r)
  }

  # 2) response headers as Googlebot sees them (look for x-robots-tag: it must NOT say noindex)
  Write-Host "`nHeaders:" -ForegroundColor Yellow
  curl.exe -s -I -A $agents["Googlebot desktop"] $url | Select-String -Pattern "^HTTP|x-robots-tag|^location|^server|^cache-control"

  # 3) tags inside the page as Googlebot sees them
  Write-Host "`nTags in the HTML:" -ForegroundColor Yellow
  $html = curl.exe -s -A $agents["Googlebot desktop"] $url
  ($html | Select-String -Pattern '<title>[^<]*</title>|<meta name="robots"[^>]*>|<meta name="googlebot"[^>]*>|<link rel="canonical"[^>]*>' -AllMatches).Matches.Value
}

# 4) the address without the final "/" should redirect once (308) to the one with "/"
Write-Host ""
Write-Host "=== Address without the trailing slash (expect a 308 redirect, then 200)" -ForegroundColor Cyan
curl.exe -s -o NUL -L -A $agents["Googlebot desktop"] -w "HTTP %{http_code} | redirects: %{num_redirects} | final: %{url_effective}`n" "https://www.pkdascollegeofphysiotherapy.com/application-form-2026"