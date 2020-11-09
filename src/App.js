import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from '@mdi/react';
import { mdiCircleSmall, mdiArrowRight, mdiArrowLeft } from '@mdi/js';

const RootDiv = styled.div`
  overflow-x: hidden;
`

const DivImage = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
`

const FlexBetween = styled.div`
  padding: 0 2em;
  display: flex;
  justify-content: space-around;
`

const Image = styled.img`
  width: 80vw;
`

const ImageLeft = styled(Image)`
  position: relative;
  left: -5vw;
`

const ImageRight = styled(Image)`
  position: relative;
  right: -5vw;
`

const Button = styled.button`
  display:inline-block;
  font-weight:400;
  color:#212529;
  text-align:center;
  vertical-align:middle;
  user-select:none;
  background-color:transparent;
  border:1px solid transparent;
  border-radius:.25rem;
  transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  &:hover{
    text-decoration:none
  }
  &:focus{
    outline:0;
  }
`

export default class App extends Component {
  state = {
    currentImage: 0,
    images: [
      { img:'dekd1', bulletColor: "gray"}, 
      { img:'dekd2', bulletColor: "gray"}, 
      { img:'dekd3', bulletColor: "gray"}, 
      { img:'dekd4', bulletColor: "gray"}, 
      { img:'dekd5', bulletColor: "gray"}, 
    ],
  }

  nextImage = () => {
    let prevIndex = this.state.currentImage
    let currentImage = this.state.currentImage + 1
    if (currentImage === this.state.images.length) {
      currentImage = 0
    }
    this.setBulletColor(prevIndex, currentImage)
    this.setState({ currentImage })
  }
  previousImage = () => {
    let prevIndex = this.state.currentImage
    let currentImage = this.state.currentImage - 1
    if (currentImage < 0) {
      currentImage = this.state.images.length - 1
    }
    this.setBulletColor(prevIndex, currentImage)
    this.setState({ currentImage })
  }
  handleClick = (index) => {
    let prevIndex = this.state.currentImage
    this.setState({
      currentImage: index
    })
    this.setBulletColor(prevIndex, index)
  }
  setBulletColor = (prevIndex, currentIndex) =>{
    const images = this.state.images.slice() 
    images[currentIndex].bulletColor = 'orange' 
    images[prevIndex].bulletColor = 'gray'
    this.setState({ images }) 
  }
  componentDidMount(){
    const currentImage = Math.floor(Math.random() * 100 / 20)
    const images = this.state.images.slice()
    images[currentImage].bulletColor = 'orange'
    this.setState({ images, currentImage }) 
  }
  handleMouseOver(index){
    const images = this.state.images.slice()
    images[index].bulletColor = 'black'
    this.setState({ images }) 
  }
  handleMouseOut(index){
    if(index !== this.state.currentImage){
      const images = this.state.images.slice()
      images[index].bulletColor = 'gray'
      this.setState({ images }) 
    }else if (index === this.state.currentImage) {
      const images = this.state.images.slice()
      images[index].bulletColor = 'orange'
      this.setState({ images }) 
    }
  }

  render() {
    return (
      <RootDiv>
          <DivImage>
            <ImageLeft src={`/images/${this.state.images[this.state.currentImage - 1 < 0 ? this.state.images.length - 1 : this.state.currentImage - 1].img}.jpg`} />
            <Image src={`/images/${this.state.images[this.state.currentImage].img}.jpg`} />
            <ImageRight src={`/images/${this.state.images[this.state.currentImage + 1 === this.state.images.length ? 0 : this.state.currentImage + 1].img}.jpg`} />
          </DivImage>
          <FlexBetween>
            <Button onClick={() => this.previousImage()}>
              <Icon path={mdiArrowRight}
                size={2}
                horizontal
                vertical
                rotate={0}
                color="gray" />
            </Button>
            <div>
              {
              this.state.images.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => this.handleClick(index)}
                  onMouseOver={() => this.handleMouseOver(index)}
                  onMouseOut={() => this.handleMouseOut(index)}
                >
                  <Icon path={mdiCircleSmall}
                    size={2}
                    horizontal
                    vertical
                    color={data.bulletColor} />
                </Button>
              ))
            }
          </div>
            <Button onClick={() => this.nextImage()}>
              <Icon path={mdiArrowLeft}
                size={2}
                horizontal
                vertical
                rotate={0}
                color="gray" />
            </Button>
          </FlexBetween>
          
      </RootDiv>
    )
  }
}

