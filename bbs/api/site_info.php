<?php
include_once('../common.php');
header('Content-Type: application/json; charset=utf-8');

// 1) GA / META
$config = sql_fetch("SELECT cf_analytics, cf_add_meta FROM {$g5['config_table']}");

// 2) 팝업
$popup_sql = "
  SELECT po_id, po_subject, po_content, po_width, po_height, po_left, po_top,
         po_begin_time, po_end_time, po_device, po_use
  FROM {$g5['popup_table']}
  WHERE po_use = 1
    AND (po_begin_time IS NULL OR po_begin_time <= NOW())
    AND (po_end_time IS NULL OR po_end_time >= NOW())
  ORDER BY po_id DESC";
$popup_result = sql_query($popup_sql);
$popups = [];
while ($row = sql_fetch_array($popup_result)) {
    $popups[] = [
        'id' => (int)$row['po_id'],
        'subject' => $row['po_subject'],
        'content' => stripslashes($row['po_content']),
        'width' => (int)$row['po_width'],
        'height' => (int)$row['po_height'],
        'left' => (int)$row['po_left'],
        'top' => (int)$row['po_top']
    ];
}

echo json_encode([
    'code' => 200,
    'data' => [
        'ga_script' => stripslashes($config['cf_analytics']),
        'meta' => stripslashes($config['cf_add_meta']),
        'popups' => $popups
    ]
], JSON_UNESCAPED_UNICODE);
exit;
?>
