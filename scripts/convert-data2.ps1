 Import-Csv ./EUPopulation.csv -Delimiter ';' |
   %{ [PSCustomObject] @{ geo=$_.geo; population=[int] $_.2017 } } | ConvertTo-Json | Out-File -Encoding utf8 ../data/data2.json
   