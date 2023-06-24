import "firebase/compat/app";
import "firebase/compat/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
} from "firebase/storage";

const storage = getStorage();

// Upload file
async function upload(reference, file) {
  try {
    const storageRef = ref(storage, reference);
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytes(storageRef, file, metadata);
    await uploadTask;
  } catch (e) {
    console.log("error uploading");
    console.log(e);
    return null;
  }
}

// Delete file
async function deleteFile(reference) {
  const desertRef = ref(storage, reference);
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}

// Upload profile picture
async function uploadProfilePicture(id, file) {
  const path = "profile/" + id;
  await upload(path, file);
}

// Download profile picture
async function downloadProfilePicture(id) {
  try {
    const path = "profile/" + id;
    const url = await getDownloadURL(ref(storage, path));
    return url;
  } catch (e) {
    console.log(e);
  }
}

// Upload attachments
async function uploadAttachments(id, files) {
  if (files == null || files.length == 0) {
    return null;
  }
  var attachments_url = [];
  for (var i = 0; i < files.length; i++) {
    const file = files[i];
    var path = "task/" + id + "/" + file.name;
    var counter = 1;
    var exist = await exists(path);
    while (exist) {
      if (counter == 1) {
        path += " (1)";
      } else {
        path = path.slice(0, -(1 + (counter - 1).toString().length));
        path += counter;
        path += ")";
      }
      counter++;
      exist = await exists(path);
    }
    await upload(path, file);
    const url = await getDownloadURL(ref(storage, path));
    const new_name =
      counter > 1 ? file.name + " (" + (counter - 1) + ")" : file.name;
    const name = new_name + "<firebasename:firebaseurl>" + url;
    attachments_url.push(name);
  }
  return attachments_url;
}

// Delete attachments
async function deleteAttachments(id, files) {
  try {
    const path = "task/" + id + "/";
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      const attachment_ref = path + file.name;
      await deleteFile(attachment_ref);
    }
  } catch (e) {
    console.log(e);
  }
}

async function exists(path) {
  try {
    const url = await getDownloadURL(ref(storage, path));
    console.log("file exist: " + url);
    return true;
  } catch (error) {
    return false;
  }
}

async function getFilesFromPath(path) {
  const listRef = ref(storage, path);
  var list = [];
  var result = await listAll(listRef);
  for (const item of result.items) {
    const url = await getDownloadURL(item);
    list.push({
      name: item.name,
      url: url,
    });
  }
  return list;
}

export {
  upload,
  uploadProfilePicture,
  downloadProfilePicture,
  deleteFile,
  uploadAttachments,
  getFilesFromPath,
  deleteAttachments,
};
