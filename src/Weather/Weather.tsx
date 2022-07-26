import React from "react";
import {Button, Form, Input, Table, Image, Descriptions} from "antd";
import {fetchWeatherData} from "../request/request";
import "./Weather.css";

const {Column} = Table;

interface IState {
    data?: WeatherData
}

interface WeatherData {
    location: Location;
    current: Current;
    forecast: Forecast;
}

interface Forecast {
    forecastday: ForecastDay[];
}

interface ForecastDay {
    date: Date;
    date_epoch: EpochTimeStamp;
    day: Day;
}

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: EpochTimeStamp;
    localtime: Date;
}

interface Current {
    last_updated_epoch: EpochTimeStamp;
    last_updated: Date;
    condition: Condition
    temp_c: number;
    temp_f: number;
    is_day: number;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition
    uv: number;
}

interface Condition {
    text: string;
    icon: string;
    code: number
}

class Weather extends React.Component<any, IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {}
    }

    render() {
        const onFinish = (values: any) => {
            console.log('Success:', values);
            fetchWeatherData(values.zipcode) // values.{form item input name}
                .then(res => {
                    console.log(res.data)
                    this.setState(res.data) // setState( {field:value} ) <==> setState(Object)
                })
                .catch(err => {
                    console.log(err)
                    alert(err)
                })
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className={"Weather"}>
                <div>
                    <Form
                        className={"form"}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item className={"form-item"}
                            label="Input Zipcode"
                            name="zipcode"
                            rules={[{required: true, message: 'Please input your zipcode!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <br/>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Get Weather Data
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <br/>

                <Descriptions className={"description"} title={"Location Info:"} layout={'vertical'} style={{display: this.state.data ? 'block' : 'none'}} bordered>
                    <Descriptions.Item className={"description-item"} label="town: ">{this.state.data?.location.name}</Descriptions.Item>
                    <Descriptions.Item className={"description-item"} label="region: ">{this.state.data?.location.region}</Descriptions.Item>
                    <Descriptions.Item className={"description-item"} label="local time: ">{this.state.data?.location.localtime.toString()}</Descriptions.Item>
                </Descriptions>

                {/*<div className={"description"} style={{display: this.state.data ? 'block' : 'none'}}>*/}
                {/*    <li>Location Info: </li>*/}
                {/*    <p>town: {this.state.data?.location.name}</p>*/}
                {/*    <p>region: {this.state.data?.location.region}</p>*/}
                {/*    <p>local time: {this.state.data?.location.localtime.toString()}</p>*/}
                {/*</div>*/}
                <br/>

                <Descriptions className={"description"} title={"Current Info: "} layout={'vertical'} style={{display: this.state.data ? 'block' : 'none'}} bordered>
                    <Descriptions.Item label="Weather Condition: " span={1} className={"description-item"}>
                        {this.state.data?.current.condition.text}
                        <Image preview={false} src={this.state.data?.current.condition.icon}/>
                    </Descriptions.Item>
                    <Descriptions.Item className={"description-item"} label="temperature: ">{this.state.data?.current.temp_c}</Descriptions.Item>
                    <Descriptions.Item className={"description-item"} label="wind speed: ">{this.state.data?.current.wind_kph}</Descriptions.Item>
                    <Descriptions.Item className={"description-item"} label="wind direction: ">{this.state.data?.current.wind_dir}</Descriptions.Item>
                    <Descriptions.Item className={"description-item"}  label="humidity: ">{this.state.data?.current.humidity}</Descriptions.Item>
                </Descriptions>

                {/*<div className={"description"} style={{display: this.state.data ? 'block' : 'none'}}>*/}
                {/*    <li>Current Info: </li>*/}
                {/*    <Image preview={false} src={this.state.data?.current.condition.icon}/>*/}
                {/*    <p>Weather Condition: {this.state.data?.current.condition.text}</p>*/}
                {/*    <p>temperature: {this.state.data?.current.temp_c}</p>*/}
                {/*    <p>wind speed: {this.state.data?.current.wind_kph}</p>*/}
                {/*    <p>wind direction: {this.state.data?.current.wind_dir}</p>*/}
                {/*    <p>humidity: {this.state.data?.current.humidity}</p>*/}
                {/*</div>*/}
                <br/>

                <div className={"table"} style={{display: this.state.data ? 'block' : 'none'}}>
                    <br/>
                    <li>Future Info: </li>
                    <Table<ForecastDay>
                        id={"WTable"}
                        dataSource={this.state.data?.forecast.forecastday}
                        showHeader={true}
                    >
                        <Column<ForecastDay>
                            key="weather"
                            className={"column"}
                            title={" Weather Condition: "}
                            dataIndex={['day', 'condition', 'text']}
                            colSpan={2}
                        />
                        <Column<ForecastDay>
                            className={"column"}
                            dataIndex={['day', 'condition', 'icon']}
                            render={(dataIndex) => <Image preview={false} src={dataIndex}/>}
                            colSpan={0}
                        />
                        <Column<ForecastDay>
                            key="date"
                            className={"column"}
                            title={" Date: "}
                            dataIndex="date"
                        />
                        <Column<ForecastDay>
                            key="average temperature"
                            className={"column"}
                            title={" Average temperature: "}
                            dataIndex={['day', 'avgtemp_c']}
                        />
                        <Column<ForecastDay>
                            key="max temperature"
                            className={"column"}
                            title={" Max temperature: "}
                            dataIndex={['day', 'maxtemp_c']}
                        />
                        <Column<ForecastDay>
                            key="min temperature"
                            className={"column"}
                            title={" Min temperature: "}
                            dataIndex={['day', 'mintemp_c']}
                        />
                        <Column<ForecastDay>
                            key="chance rain"
                            className={"column"}
                            title={" Chance of rain: "}
                            dataIndex={['day', 'daily_chance_of_rain']}
                        />
                        <Column<ForecastDay>
                            key="chance snow"
                            className={"column"}
                            title={" Chance of snow: "}
                            dataIndex={['day', 'daily_chance_of_snow']}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}

export default Weather;