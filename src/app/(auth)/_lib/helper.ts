export const getInitials = (name: string) => {
  let parts = name.split(" ");
  let _initials = "";
  for (const element of parts) {
    if (element.length > 0 && element !== "") {
      _initials += element[0];
    }
  }
  return _initials;
};

export const transformURL = (url: string) => {
  let link = "#";
  if (url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (url.startsWith("http//")) {
        link = url.replace("http//", "http://");
      } else if (url.startsWith("https//")) {
        link = url.replace("https//", "https://");
      } else {
        link = "https://" + url;
      }
    }
  }
  return link;
};

function getImageExtensionFromBase64(base64String) {
  const base64Regex = /^data:image\/([a-zA-Z]+);base64,/;

  const match = base64String.match(base64Regex);

  if (match && match[1]) {
    return match[1].toUpperCase();
  }

  return null;
}

const convertImageUrlToBase64 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        resolve(base64Data);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching or converting image:", error);
    throw error;
  }
};

export const makeVCard = async (
  _profile: any,
  _profileImg = "",
  _companyImg = "",
) => {
  console.log(_profile.profilePic);
  let profileImg;
  if (_profile.profilePic) {
    if (_profile.profilePic.data) {
      await convertImageUrlToBase64(
        process.env.NEXT_PUBLIC_IMAGE_URL +
          _profile.profilePic.data.attributes.url,
      ).then((base64Image) => {
        //console.log(base64Image);
        const imageExtension = getImageExtensionFromBase64(base64Image);

        profileImg =
          imageExtension +
          ":" +
          base64Image
            .replace(/^data:image\/?[A-z]*;base64,/)
            .replace("undefined", "");
      });
    }
  }

  let companyImg;
  if (_profile.companyLogo) {
    if (_profile.companyLogo.data) {
      await convertImageUrlToBase64(
        process.env.NEXT_PUBLIC_IMAGE_URL +
          _profile.companyLogo.data.attributes.url,
      ).then((base64Image) => {
        const imageExtension = getImageExtensionFromBase64(base64Image);
        companyImg =
          imageExtension +
          ":" +
          base64Image
            .replace(/^data:image\/?[A-z]*;base64,/)
            .replace("undefined", "");
      });
    }
  }

  let vcard = `BEGIN:VCARD
VERSION:3.0
N;CHARSET=UTF-8:${_profile.name}
FN;CHARSET=UTF-8:${_profile.name}
ORG;CHARSET=UTF-8:${_profile.companyName}
TITLE;CHARSET=UTF-8:${_profile.designation}
TEL;TYPE=HOME,VOICE:${_profile.homePhone}
TEL;TYPE=WORK,VOICE:${_profile.workPhone}
ADR;TYPE=WORK,PREF:;;${_profile.street};${_profile.city};${_profile.state};${_profile.zipCode}`;

  if (_profile.mobilePhone) {
    vcard += `
TEL;TYPE=CELL::${_profile.mobilePhone}`;
  }

  if (_profile.personalEmail) {
    vcard += `
EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:${_profile.personalEmail}`;
  }

  if (_profile.email) {
    vcard += `
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${_profile.email}`;
  }

  if (_profile.website) {
    vcard += `
URL;type=WORK;CHARSET=UTF-8:${_profile.website}`;
  }

  if (profileImg) {
    vcard +=
      `
PHOTO;ENCODING=b;TYPE=` + profileImg;
  }

  if (companyImg) {
    vcard +=
      `
LOGO;ENCODING=b;TYPE=` + companyImg;
  }

  /*   if (_profile.links && _profile.links.length > 0) {
    _profile.links.map((singleLink) => {
      if (singleLink.url) {
        vcard +=
          `
X-SOCIALPROFILE;TYPE=` +
          singleLink.linkType.toLowerCase() +
          `:` +
          singleLink.url;
      }
    });
  } */

  vcard += `
REV:${new Date().toISOString()}
END:VCARD`;

  /* 
  X-SOCIALPROFILE;TYPE=facebook:${_profile.website}
  X-SOCIALPROFILE;TYPE=twitter:${_profile.website}
  X-SOCIALPROFILE;TYPE=linkedin:${_profile.website}
  X-SOCIALPROFILE;TYPE=instagram:${_profile.website} */

  downloadToFile(vcard, _profile.name + " vcard.vcf", "text/vcard");
};

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};
