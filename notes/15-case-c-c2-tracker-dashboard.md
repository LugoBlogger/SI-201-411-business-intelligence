# Week 15 - Case Study C: C2 Tracker Dashboard

## Grafana


C2 is the abbreviation of Command and Center

## Grafana Fundamentals    
https://grafana.com/tutorials/grafana-fundamentals/?pg=tutorials&plcmt=results#build-a-dashboard

- Prerequisites    
  - Docker
  - Docker Compose
  - Git

### Docker installation and setup
Install Docker Desktop in Windows

Install Docker Desktop in Linux
https://docs.docker.com/desktop/setup/install/linux/ubuntu/#prerequisites

1. Set up Docker's `apt` repository
   ```
   # Add Docker's official GPG key:
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   # Add the repository to Apt sources:
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```

2. Download the latest DEB package. For checksums, see the Release notes

3. Install theh package using `apt`
   ```
   sudo apt-get update
   sudo ap-get install ./docker-desktop-amd64.deb 
   ```

4. (optional) Remove the `./docker/config.json` if the need a permission 
   to read. Restart Docker Desktop to recreate it

5. Sign in to Docker Desktop   
   https://docs.docker.com/desktop/setup/sign-in/#credentials-management-for-linux-users
   
   Real name: lugoblogger    
   Email address: lugoblogger@gmail.com
   
   GPG ID from the line
   ```
   pub   rsa3072 2025-05-27 [SC] [expires: 2027-05-27]
      D606799C8BD3D4ACA8D275A57DCCD8CC6111496A
   ```

- Import dashboard    
  https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/

- Getting started with managing your metrics, logs, and traces using Grafana        
  Jun 11, 2025 16:30 UTC / Jun 12, 2025 00:30 WITA    
  https://grafana.com/go/webinar/getting-started-with-grafana-lgtm-stack/?pg=docs-grafana-latest-dashboards-build-dashboards-import-dashboards&plcmt=related

- How to build advanced dashboards in Grafana    
  Apr 30, 2025  On Demand    
  https://grafana.com/go/webinar/building-advanced-grafana-dashboards/?pg=docs-grafana-latest-dashboards-build-dashboards-import-dashboards&plcmt=related-3

- Getting started with Grafana dashboard design     
  Apr 24, 2025    
  https://grafana.com/go/webinar/getting-started-with-grafana-dashboard-design/?pg=docs-grafana-latest-dashboards-build-dashboards-import-dashboards&plcmt=related-2

## Grafana Cloud

Free Tier Grafana cloud
register for free in https://grafana.com/


## C2Live 

Use a new environment in Conda
```
conda create -n C2Live python=3.11 -c conda-forge
conda activate C2Live
```

Remove version in  `elastic-grafana-docker-compose.yaml`

Use the following command to run docker compose
```
docker compose -f elastic-grafana-docker-compose.yaml up
```

Open `localhost:9200`

run `python connectors.py`

Install Grafana    
https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/

Edit `connector.py`, in function `create_elastic_datasource()`, add
```py
elif response.status_code == 409:
    print(f"{Fore.GREEN}{description} already exists. Continuing...{Style.RESET_ALL}")
    return True
```

Edit `main.py`, in function `loop_on_data`, replace `data.append()` with
```py
data.append({"framework": name, "ip": ip, 
    "@timestamp": datetime.utcnow().isoformat()})
```

In Grafana, enter "Connections > Data Source". Click "elasticsearch".
Now we enter "Settings" tab. In "Additional settings", set "Patterns: No pattern"   

Scroll down the "Settings" tab, and click "Save & test". 


## References to understand C2 server
- (Sikorski and Honig, 2012) - Practical Malware Analysis - The Hands-On Guide 
  to Dissecting Malicious Software
- (Sanders and Smith, 2014) - Applied Network Security Monitoring - Collection, 
  Detection, and Analysis.