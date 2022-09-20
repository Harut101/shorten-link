import moment from "moment";

function dataResolve(data) {
  const columns = [
    { id: 1, field: "title", headerName: "Title", width: 200 },
    { id: 2, field: "shortLink", headerName: "Short URL", width: 200 },
    { id: 3, field: "longLink", headerName: "Long URL", width: 200 },
    { id: 4, field: "createdAt", headerName: "Create At", width: 200 },
  ];

  const rows = resolveRows(data);

  return { columns, rows };
}

function resolveRows(data) {
  return data.map((dataItem) => ({
    id: dataItem.id,
    title: dataItem.title,
    shortLink: dataItem.link,
    longLink: dataItem.long_url,
    createdAt: moment(dataItem.created_at).format("DD-MM-YYYY"),
  }));
}

export default dataResolve;
