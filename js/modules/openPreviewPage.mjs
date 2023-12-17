export default function openPreviewListing(data) {
  let params = new URLSearchParams(window.location.search);
  let tagString = data.tags.join(",");
  let mediaString = data.media.join(",");
  params.delete("create");
  params.set("preview", "true");
  params.set("title", data.title);
  params.set("description", data.description || "");
  params.set("tags", tagString);
  params.set("media", mediaString);
  params.set("endsAt", data.endsAt);
  window.location.href = "/listings/listing/" + "?" + params;
}
