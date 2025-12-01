import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Tutorials = () => {
    const [videos, setVideos] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Replace with your YouTube API Key
    const API_KEY = "AIzaSyC1RhbtXof0S91iTeOLSiLqI92lA79S9RQ";

    // Allowed cybersecurity keywords
    // const allowedKeywords = [
    //     "cybersecurity",
    //     "hacking",
    //     "phishing",
    //     "cryptography",
    //     "owasp",
    //     "network security"
    // ];
    const allowedKeywords = [
        "cybersecurity", "hacking", "phishing", "cryptography", "owasp", "network security",
        "compliance", "firewall", "encryption", "malware", "ransomware", "security breach",
        "social engineering", "data breach", "penetration testing", "risk assessment",
        "ethical hacking", "zero trust", "business continuity planning", "digital forensics",
        "information security", "cloud security", "disaster recovery", "insider threat",
        "it security", "vulnerability management", "endpoint security", "identity and access management",
        "incident response", "data protection", "security awareness training", "mobile security",
        "penetration testing tools", "vulnerability assessment", "cyber threat intelligence",
        "security policy", "secure coding", "security audit", "web application security",
        "cyber hygiene", "advanced persistent threat", "cyber attacks", "siem", "dos", "ddos",
        "vpn", "antivirus", "spyware", "adware", "trojan", "worm", "botnet", "keylogger",
        "rootkit", "backdoor", "brute force attack", "sql injection", "cross-site scripting",
        "csrf", "man-in-the-middle attack", "session hijacking", "zero-day exploit", "patch management",
        "security operations center", "threat hunting", "red teaming", "blue teaming", "purple teaming",
        "security information and event management", "intrusion detection system", "intrusion prevention system",
        "public key infrastructure", "two-factor authentication", "multi-factor authentication",
        "single sign-on", "access control", "least privilege", "security token", "biometrics",
        "password policy", "data loss prevention", "disk encryption", "email security", "web security",
        "application security", "database security", "network segmentation", "security by design",
        "security testing", "security assessment", "security compliance", "security governance",
        "security metrics", "security incident", "security event", "security monitoring",
        "security analytics", "threat intelligence platform", "threat feed", "threat actor",
        "threat vector", "attack surface", "attack vector", "kill chain", "cyber kill chain",
        "defense in depth", "security posture", "security maturity", "security framework",
        "nist cybersecurity framework", "iso 27001", "gdpr", "hipaa", "pci dss", "sox compliance",
        "ferpa", "fisma", "cmmc", "cyber insurance", "security policy management", "security orchestration",
        "security automation", "security playbook", "incident response plan", "business impact analysis",
        "disaster recovery plan", "crisis management", "emergency response", "tabletop exercise",
        "breach notification", "forensic analysis", "chain of custody", "e-discovery", "log management",
        "syslog", "security event correlation", "security incident management", "security ticketing",
        "security operations automation", "security orchestration automation and response",
        "user behavior analytics", "network traffic analysis", "packet capture", "deep packet inspection",
        "network flow analysis", "network forensics", "host-based intrusion detection system",
        "network-based intrusion detection system", "honeypot", "honeynet", "deception technology",
        "sandboxing", "malware analysis", "reverse engineering", "threat modeling", "risk management",
        "risk mitigation", "risk acceptance", "risk transfer", "risk avoidance", "security control",
        "preventive control", "detective control", "corrective control", "compensating control",
        "security audit trail", "security log", "audit log", "compliance audit", "security assessment report",
        "vulnerability scan", "penetration test", "security test", "security evaluation", "security review",
        "code review", "secure code review", "application penetration testing", "network penetration testing",
        "wireless security", "mobile device management", "bring your own device", "internet of things security",
        "industrial control system security", "scada security", "critical infrastructure protection",
        "supply chain security", "third-party risk management", "vendor risk management", "outsourcing security",
        "cloud access security broker", "secure web gateway", "data masking", "tokenization", "anonymization",
        "pseudonymization", "data classification", "data labeling", "data discovery", "data inventory",
        "data mapping", "data flow", "data lifecycle", "data retention", "data disposal", "data destruction",
        "data sanitization", "data wiping", "data erasure", "data breach response", "data breach notification",
        "privacy impact assessment", "data protection impact assessment", "privacy by design", "privacy by default",
        "consent management", "cookie management", "data subject access request", "right to be forgotten",
        "data portability", "data minimization", "purpose limitation", "data accuracy", "data integrity",
        "data confidentiality", "data availability", "data resilience", "data sovereignty", "data localization",
        "cross-border data transfer", "international data transfer", "standard contractual clauses",
        "binding corporate rules", "privacy shield", "data transfer agreement", "data sharing agreement",
        "data processing agreement", "data controller", "data processor", "joint controller", "sub-processor",
        "data protection officer", "chief information security officer", "chief privacy officer",
        "information security manager", "security analyst", "security engineer", "security architect",
        "security consultant", "security administrator", "security specialist", "security researcher",
        "ethical hacker", "penetration tester", "red teamer", "blue teamer", "purple teamer", "threat hunter",
        "incident responder", "forensic analyst", "malware analyst", "reverse engineer", "security auditor",
        "compliance officer", "risk manager", "security trainer", "security awareness trainer",
        "security evangelist", "security advocate", "security champion", "security mentor", "security coach",
        "security blogger", "security podcaster", "security influencer", "security speaker", "security author",
        "security writer", "security journalist", "security reporter", "security editor", "security publisher",
        "security analyst relations", "security public relations", "security marketing", "security sales",
        "security business development", "security account manager", "security customer success",
        "security support", "security operations", "security engineering", "security architecture",
        "security consulting", "security advisory", "security assessment", "security testing",
        "security auditing", "security compliance", "security governance", "security risk management",
        "security policy", "security strategy", "security roadmap", "security program", "security project",
        "security initiative", "security campaign","FTP", "SSH", "Telnet", "SMTP","ssh", "DNS", "HTTP", "POP3",
        "IMAP", "HTTPS", "RDP", "SFTP", "SNMP", "LDAP", "NTP", "MySQL", "PostgreSQL", "MSSQL", "Oracle DB", 
        "Redis", "MongoDB","AES", "DES", "3DES", "RSA", "DSA", "ECDSA", "Diffie-Hellman", "MD5", "SHA-1", 
        "SHA-256", "SHA-512", "Blowfish", "Twofish", "RC4", "RC5", "RC6", "ElGamal", "Ed25519", 
        "ChaCha20", "Poly1305","firewall", "intrusion detection system", "intrusion prevention system",
         "virtual private network", "network access control", "security information and event management",
          "network segmentation", "demilitarized zone", "honeypot", "honeynet", "packet filtering", 
          "stateful inspection", "proxy server", "network address translation", "port forwarding", 
          "deep packet inspection", "network protocol analyzer", "wireless security", "802.1X", "RADIUS",
           "TACACS+", "IPsec", "SSL/TLS", "SSH", "WPA2", "WPA3", "MAC filtering", "VPN tunneling",
            "site-to-site VPN", "remote access VPN", "network monitoring", "bandwidth throttling", 
            "quality of service", "load balancing", "failover", "high availability", "redundancy", 
            "network topology", "mesh network", "star network", "bus network", "ring network", 
            "hybrid network", "client-server model", "peer-to-peer network", "network infrastructure",
             "network appliance", "network controller", "network switch", "network hub", "network bridge",
              "network router", "network gateway", "network firewall", "network proxy", "network repeater",
               "network extender", "network adapter", "network interface card", "network port", 
               "network socket", "network protocol", "TCP/IP", "UDP", "ICMP", "ARP", "RARP", "DHCP",
                "DNS", "HTTP/HTTPS", "FTP/SFTP", "SMTP", "POP3", "IMAP", "SNMP", "Telnet", "SSH",
                 "LDAP", "NTP", "BGP", "OSPF", "EIGRP", "RIP", "IS-IS", "MPLS", "VLAN", "STP", 
                 "RSTP", "PVST", "EtherChannel", "LACP", "PAgP", "HSRP", "VRRP", "GLBP", "QoS", 
                 "DSCP", "CoS", "ToS", "DiffServ", "IntServ", "MPLS", "VPN", "GRE", "IPsec",
                  "SSL/TLS VPN", "PPTP", "L2TP", "SSTP", "IKEv2", "OpenVPN", "WireGuard", 
                  "SoftEther", "ZeroTier", "Hamachi", "TeamViewer", "AnyDesk", "Remote Desktop",
                   "VNC", "Citrix", "VMware Horizon", "AWS WorkSpaces", "Azure Virtual Desktop", 
                   "Google Cloud Desktop", "Desktop-as-a-Service", "Infrastructure-as-a-Service",
                   "Platform-as-a-Service", "Software-as-a-Service", "Network-as-a-Service", 
                   "Storage-as-a-Service", "Database-as-a-Service", "Function-as-a-Service", 
                   "Backend-as-a-Service", "Security-as-a-Service", "Monitoring-as-a-Service", 
                   "Logging-as-a-Service", "Analytics-as-a-Service", "Communication-as-a-Service",
                    "Collaboration-as-a-Service", "Content-as-a-Service", "Media-as-a-Service", 
                    "Search-as-a-Service", "Identity-as-a-Service", "Access-as-a-Service", 
                    "Policy-as-a-Service", "Compliance-as-a-Service", "Governance-as-a-Service",
                     "Risk-as-a-Service", "Threat-as-a-Service", "Incident-as-a-Service", 
                     "Response-as-a-Service", "Recovery-as-a-Service", "Backup-as-a-Service", 
                     "Disaster-Recovery-as-a-Service", "Business-Continuity-as-a-Service", 
                     "High-Availability-as-a-Service", "Load-Balancing-as-a-Service", 
                     "Failover-as-a-Service", "Redundancy-as-a-Service", "Scalability-as-a-Service",
                      "Elasticity-as-a-Service", "Performance-as-a-Service", "Optimization-as-a-Service", 
                      "Acceleration-as-a-Service", "Caching-as-a-Service", "Compression-as-a-Service", 
                      "Deduplication-as-a-Service", "Replication-as-a-Service", 
                      "Synchronization-as-a-Service", "Migration-as-a-Service", 
                      "Integration-as-a-Service", "Orchestration-as-a-Service",
                       "Automation-as-a-Service", "Provisioning-as-a-Service", 
                       "Configuration-as-a-Service", "Deployment-as-a-Service",
                       "Testing-as-a-Service", "Development-as-a-Service", 
                       "Staging-as-a-Service", "Production-as-a-Service", 
                       "Environment-as-a-Service", "Container-as-a-Service", 
                       "Kubernetes-as-a-Service", "Docker-as-a-Service", "Serverless-as-a-Service", "Microservices-as-a-Service", "API-as-a-Service", "SDK-as-a-Service", "Library-as-a-Service", "Framework-as-a-Service", "Template-as-a-Service", "Blueprint-as-a-Service", "Pattern-as-a-Service", "Best-Practice-as-a-Service", "Guideline-as-a-Service", "Standard-as-a-Service", "Policy-as-a-Service", "Procedure-as-a-Service", "Process-as-a-Service", "Workflow-as-a-Service", "Pipeline-as-a-Service", "Job-as-a-Service", "Task-as-a-Service", "Script-as-a-Service", "Command-as-a-Service", "Instruction-as-a-Service", "Operation-as-a-Service", "Function-as-a-Service", "Method-as-a-Service", "Class-as-a-Service", "Object-as-a-Service", "Instance-as-a-Service", "Component-as-a-Service", "Module-as-a-Service", "Package-as-a-Service", "Bundle-as-a-Service", "Suite-as-a-Service", "Platform-as-a-Service", "Ecosystem-as-a-Service", "Marketplace-as-a-Service", "Exchange-as-a-Service", "Broker-as-a-Service", "Aggregator-as-a-Service", "Provider-as-a"

 
    ];
     
    
    // Function to fetch videos based on a query
    const fetchVideos = (query) => {
        setLoading(true);
        // Append 'cybersecurity' to user query
        const enforcedQuery = `${query} cybersecurity`;
        const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${enforcedQuery}&type=video&maxResults=10&key=${API_KEY}`;

        axios
            .get(URL)
            .then((response) => {
                const videoItems = response.data.items.map((item) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                }));
                setVideos(videoItems);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching YouTube videos:", error);
                setLoading(false);
            });
    };

    // Fetch default videos on component mount
    useEffect(() => {
        fetchVideos("Cybersecurity");
    }, []);

    // Handle form submission with input validation
    const handleSearch = (e) => {
        e.preventDefault();
        // Check if userInput contains any allowed keyword
        const isValid = allowedKeywords.some((keyword) =>
            userInput.toLowerCase().includes(keyword)
        );

        if (!isValid) {
            alert("Please enter cybersecurity-related terms only!");
            return;
        }

        // If valid, fetch the videos
        fetchVideos(userInput);
    };

    return (
        <div style={{ padding: "20px" }} className="Tut-container">
            <h2>TUTORIALS</h2>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Search for CyberSecurity tutorials..."
                    style={{
                        padding: "10px",
                        width: "400px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginLeft: "30%",
                        marginRight: "5px",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "140px",
                    }}
                >
                    Search
                </button>
            </form>

            {/* Videos List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    videos.map((video) => (
                        <div
                            key={video.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "5px",
                            }}
                            className="tutorials-header"
                        >
                            <h3>{video.title}</h3>
                            <div
                                style={{
                                    position: "relative",
                                    paddingBottom: "56.25%",
                                    height: 0,
                                }}
                            >
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tutorials;