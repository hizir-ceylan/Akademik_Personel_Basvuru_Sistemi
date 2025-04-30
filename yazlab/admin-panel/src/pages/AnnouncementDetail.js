import { useParams } from 'react-router-dom';

function AnnouncementDetail() {
  const { id } = useParams();

  const applications = [
    { id: 1, name: "Ali Yılmaz", status: "Beklemede" },
    { id: 2, name: "Ayşe Demir", status: "Onaylandı" },
    { id: 3, name: "Mehmet Kara", status: "Reddedildi" },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "2rem", color: "#009739" }}>Başvurular (İlan ID: {id})</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {applications.map(app => (
          <div key={app.id} style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "1.5rem",
            width: "250px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}>
            <h3>{app.name}</h3>
            <p><strong>Durum:</strong> {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementDetail;
