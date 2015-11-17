<?php
/**
 * For use with Inmobile Web API v. 3.0;
 * <https://mm.inmobile.dk/Content/Inmobile%20Web-API%20documentation%20v.%203.0.pdf>
 *
 * @author
 *  Thomas Thune Hansen <tth@bellcom.dk>
 */

class Inmobile
{
  protected $request;
  protected $apikey;
  private $url = 'https://mm.inmobile.dk/Api/V2/SendMessages';

  function __construct($apikey) {
    if(!empty($apikey)) {
      $this->apikey = $apikey;
    }
    else {
      throw new Exception('No apikey given');
    }
  }

  /**
   * Fill out request, prior to sending
   *
   * @params
   *  $sendername - string
   *  $recipients - array
   *  $text - string
   * @return
   *  mixed
   */
  public function setData($sendername, $recipients, $text) {
    $request_recipients = '';
    $this->validateData($sendername, $recipients, $text);

    foreach($recipients as $key => $recipient) {
      $request_recipients .= '<msisdn>' . str_replace('+', '', $recipient) . '</msisdn>';
    }

    $this->request =
      '<request>
        <authentication
        apikey="' . $this->apikey . '" />
        <data>
          <message>
          <sendername>' . $sendername . '</sendername>
          <text><![CDATA[' . $text . ']]></text>
          <recipients>
          '.
            $request_recipients
          .'
          </recipients>
          </message>
        </data>
      </request>';
  }

  /**
   * Very basic validation function
   *
   * @params
   *  $sendername - string
   *  $recipients - array
   *  $text - string
   * @return
   *  none
   */
  private function validateData($sendername, $recipients, $text) {
    if(!empty($recipients)){
      foreach($recipients as $key => $recipient) {
        if(strlen($recipient) < 7) {
          throw new Exception('Validation error: Recipient not valid number: ' . $recipient);
        }
      }
    } else {
      throw new Exception('Validation error: Recipients needs to be an array, containing phone numbers');
    }

    if(empty($text)) {
      throw new Exception('Validation error: No message set');
    }

    if(empty($sendername)) {
      throw new Exception('Validation error: No sendername set');
    } else if(strlen($sendername) > 11) {
      throw new Exception('Validation error: Sendername too long');
    }
  }

  /**
   * Send message with specified data
   *
   * @return
   *  mixed
   */
  public function send() {
    $options = array(
      'http' => array(
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query(array('xml' => $this->request)),
      ),
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($this->url, false, $context);

    if (strpos($result, '-') === 0) {
      throw new Exception('An error occoured response from gateway: ' . $result);
    }

    return 'Message sent succesfully';
  }
}
