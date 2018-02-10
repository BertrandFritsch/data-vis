 Import-Csv ./ZonAnn.Ts.csv |
   %{
       $o = New-Object PSCustomObject
      $_.PSObject.Properties |
        %{
            if ($_.Value -eq '*****') {
                $v = $null
            }
            elseif ($_.Name -eq 'Year') {
                $v = [int] $_.Value
            }
            else {
                $v = [double] $_.Value
            }
            $o | Add-Member -MemberType NoteProperty -Name $_.Name -Value $v
        }
        $o
   } | ConvertTo-Json | Out-File -Encoding utf8 ../data/data.json
   