import React, { Component } from 'react';
import axios from 'axios';

// base url of API
const BASE_URL = 'http://localhost:4000/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null, // to store selected file
      handleResponse: null, // handle the API response
      imageUrl: null, // to store uploaded image path
      invalidImage: null // handle the message of the image validation
    };
    this.reader = new FileReader();
  }

  // handle change event of input file and validate it
  onChangeFile = event => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      this.setState({ invalidImage: 'Please select image.' });
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ invalidImage: 'Please select valid image.' });
      return false;
    }

    this.reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.setState({ selectedFile: imageFile, invalidImage: null });
      };
      img.onerror = () => {
        this.setState({ invalidImage: 'Invalid image content.' });
        return false;
      };
      img.src = e.target.result;
    };
    this.reader.readAsDataURL(imageFile);
  }

  // handle click event of the upload button
  handleUpload = () => {
    const { selectedFile } = this.state;
    if (!selectedFile) {
      this.setState({
        handleResponse: {
          isSuccess: false,
          message: "Please select image to upload."
        }
      });
      return false;
    }
    const formData = new FormData();
    formData.append('dataFile', selectedFile, selectedFile.name);
    axios.post(BASE_URL + 'uploadfile', formData).then(response => {
      this.setState({
        handleResponse: {
          isSuccess: response.status === 200,
          message: response.data.message
        },
        imageUrl: BASE_URL + response.data.file.path
      });
    }).catch(err => {
      alert(err.message);
    });
  }

  render() {
    const { handleResponse, imageUrl, invalidImage } = this.state;
    return (
      <div className="App" >
        <h4>Validate Image Content in ReactJS - Clue Mediator</h4>

        <p className="title">Select Image:</p>
        <div style={{ marginBottom: 10 }}>
          <input type="file" onChange={this.onChangeFile} />
        </div>
        {invalidImage && <p className="error">{invalidImage}</p>}
        <input type="button" value="Upload" onClick={this.handleUpload} />
        {handleResponse && <p className={handleResponse.isSuccess ? "success" : "error"}>{handleResponse.message}</p>}

        <p className="title" style={{ marginTop: 30 }}>Uploaded Image:</p>
        {imageUrl && <img src={imageUrl} alt="Uploaded File" height="100" width="100" />}
      </div>
    );
  }
}

export default App;