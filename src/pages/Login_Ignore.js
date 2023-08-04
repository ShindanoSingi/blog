import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../css/components/drag-and-drop.css';

class DragAndDrop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			left_section_strings: [
				'Seared Faroe Island Salmon',
				'broccoli baba ganoush',
				'tomato cucumber salad',
				'tahini dressing',
			],
			right_section_strings: [],
			combined_string: '',
		};
	}

	// Update the top section strings
	updatedCombinedString = () => {
		const combinedString = this.state.right_section_strings.join(' ');

		// Add a space before each string in the right section
		const space = this.state.combined_string.length > 0 ? ' ' : '';

		this.setState({
			combined_string: space + combinedString,
		});
	};

	on_drag_end = result => {
		if (!result.destination) {
			return;
		}

		if (result.source.droppableId === 'left-section') {
			const left_strings = Array.from(this.state.left_section_strings);
			const draggedItem = left_strings.splice(result.source.index, 1)[0];

			if (result.destination.droppableId === 'right-section') {
				const right_strings = Array.from(this.state.right_section_strings);
				right_strings.splice(result.destination.index, 0, draggedItem);

				this.setState(
					{
						left_section_strings: left_strings,
						right_section_strings: right_strings,
					},
					this.updatedCombinedString,
				);
			} else {
				left_strings.splice(result.destination.index, 0, draggedItem);

				this.setState({
					left_section_strings: left_strings,
				});
			}
		} else if (result.source.droppableId === 'right-section') {
			const right_strings = Array.from(this.state.right_section_strings);
			const draggedItem = right_strings.splice(result.source.index, 1)[0];

			// If dragged to the left section, remove the item from the right section and add it to the left section
			if (result.destination.droppableId === 'left-section') {
				const left_strings = Array.from(this.state.left_section_strings);
				left_strings.splice(result.destination.index, 0, draggedItem);

				this.setState(
					{
						left_section_strings: left_strings,
						right_section_strings: right_strings,
					},
					this.updatedCombinedString,
				);
			} else {
				right_strings.splice(result.destination.index, 0, draggedItem);

				this.setState(
					{
						right_section_strings: right_strings,
					},
					this.updatedCombinedString,
				);
			}
		}
	};

	render() {
		const {
			left_section_strings,
			right_section_strings,
			combined_string,
		} = this.state;

		return (
			<div className="container">
				<div className="top-section">
					<div className="combined-string">
						{combined_string}
					</div>
				</div>

				<DragDropContext onDragEnd={this.on_drag_end}>
					<div className="sections-container">
						<Droppable droppableId="left-section">
							{provided =>
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="left-section"
								>
									{left_section_strings.map((item, index) =>
										<Draggable
											key={`left_${index}`}
											draggableId={`left_${index}`}
											index={index}
										>
											{provided =>
												<div
													className="left-section-item"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{item}
												</div>}
										</Draggable>,
									)}
									{provided.placeholder}
								</div>}
						</Droppable>

						<Droppable droppableId="right-section">
							{provided =>
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="right-section"
								>
									{right_section_strings.map((item, index) =>
										<Draggable
											key={`right_${index}`}
											draggableId={`right_${index}`}
											index={index}
										>
											{provided =>
												<div
													className="right-section-item"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{item}
												</div>}
										</Draggable>,
									)}
									{provided.placeholder}
								</div>}
						</Droppable>
					</div>
				</DragDropContext>
			</div>
		);
	}
}

export default DragAndDrop;















body{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
}

:root{
      --light-gray-color: ##F6F6F6;
      --sky-blue-color: #5AD6FC;
      --gray-color: #EEEEEE;
      --dark-gray-color: #A4A4A4;
      --white-color: #FFFFFF;
}

.container{
      display:flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      align-items: center;
      justify-content: center;
}

.sections-container{
      display: flex;
      gap: 1rem;
      width: 100%;
}

.top-section{
      font-size: 1rem;
      color:var(--dark-gray-color);
      padding: 0.5rem 0.7rem;
      min-height: 2rem;
      border: 2px solid var(--gray-color);
      border-radius: 5px;
      max-height: 1rem;
      overflow: auto;
}

.left-section{
      display: flex;
      gap:0.4rem;
      flex-direction: column;
      padding: 1.2rem;
      width: 30%;
}

.left-section-item{
      background-color: var(--sky-blue-color);
      width: -moz-fit-content;
      width: fit-content;
      padding: 0.2rem 0.5rem;
      border-radius: 5px;
      color: var(--white-color);
}

.right-section{
      gap:0.1rem;
      flex-direction: row;
      padding: 1.2rem;
      width: 70%;
      display: block;
}

.right-section-item{
      background-color: var(--sky-blue-color);
      width: -moz-fit-content;
      width: fit-content;
      padding: 0.2rem 0.5rem;
      border-radius: 5px;
      color: var(--white-color);
      display: inline-block;
      margin: 0.2rem;
}

.left-section, .right-section{
      height: 30vh;
      overflow-y: scroll;
      background-color: var(--gray-color);
      border-radius: 5px;
      width: 90% !important;
}

.left-section::-webkit-scrollbar, .right-section::-webkit-scrollbar, .top-section::-webkit-scrollbar{
      width: 0.5rem;
}

@media screen and (min-width: 1440px) {
      .top-section{
            width: 98.2% !important;
      }
}

@media screen and (min-width: 885px) {
      .container{
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
      }

      .top-section{
            width: 97.9%;
      }


      .sections-container{
            flex-direction: row;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section, .right-section{
            height:37vh;
      }

      .left-section{
            width: 35% !important;
      }

      .right-section{
            width: 65% !important;
      }
}

@media screen and (max-width: 884px) {
      .container{
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
      }

      .top-section{
            width: 97%;
      }


      .sections-container{
            flex-direction: row;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section, .right-section{
            height:37vh;
      }
}

@media screen and (max-width: 834px) {
      .container{
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
      }

      .top-section{
            width: 96.5%;
      }


      .sections-container{
            flex-direction: row;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section{
            width: 35% !important;
      }

      .right-section{
            width: 65% !important;
      }

      .left-section, .right-section{
            height:37vh;
      }



}

@media screen and (max-width: 600px) {
      .top-section{
            width: 93%;
      }


      .sections-container{
            flex-direction: column;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section, .right-section{
            height:37vh;
      }

      .left-section{
            width:90% !important;
      }

      .right-section{
            width:90% !important;
      }
}

@media screen and (max-width: 425px) {

      .top-section{
            width: 93%;
      }


      .sections-container{
            flex-direction: column;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section, .right-section{
            height:35vh;
            width:90% !important;
      }
}

@media screen and (max-width: 375px) {
      .container{
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
      }

      .top-section{
            min-height: 1.5rem;
            max-height: 1.5rem;
            font-size: 0.8rem;
            width: 94%;
      }

      .sections-container{
            flex-direction: column;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section, .right-section{
            height:34vh;
            width: 90% !important;
      }
}

@media screen and (max-width: 320px) {

      .container{
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
      }
      .top-section{
            min-height: 1.5rem;
            max-height: 1.5rem;
            font-size: 0.8rem;
            width: 94%;
      }


      .sections-container{
            flex-direction: column;
            align-items: center;
            padding: 0 1rem;
      }

      .left-section, .right-section{
            height: 29vh;
            overflow-y: scroll;
            background-color: var(--gray-color);
            border-radius: 5px;
            width:90% !important;
      }

}

@media screen and (max-width: 200px) {
      .container{
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            font-size: 0.6rem;
      }
      .top-section{
            min-height: 1.5rem;
            max-height: 1.5rem;
            padding: 0.2rem 0.4rem;
            width: 100%;
            font-size: 0.6rem;
      }


      .sections-container{
            flex-direction: column;
            align-items: center;
            padding: 0rem 0rem;
      }



      .left-section, .right-section{
            height: 29vh;
            overflow-y: scroll;
            background-color: var(--gray-color);
            border-radius: 5px;
            width:82% !important;
      }

      .right-section-item{
            background-color: var(--sky-blue-color);
            width: -moz-fit-content;
            width: fit-content;
            padding: 0.2rem 0.5rem;
            border-radius: 5px;
            color: var(--white-color);
            display: inline-block;
            margin: 0.2rem;
      }

}

@media screen and (min-width: 1720px) {
      .top-section{
            width: 98.5% !important;
      }
}
